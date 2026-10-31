import json
from datetime import datetime, timedelta, timezone

import jwt
from django.conf import settings
from django.contrib.auth.hashers import check_password, make_password
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import LoginUser

# 接收前端数据，使用 JWT 无状态令牌做身份验证，密码以哈希形式入库
TOKEN_EXPIRE_DAYS = 7


def _body(request):
    try:
        return json.loads(request.body.decode('utf-8') or '{}')
    except (ValueError, UnicodeDecodeError):
        return {}


def _fail(msg, code=1):
    return JsonResponse({'code': code, 'msg': msg})


def _issue_token(user):
    payload = {
        'uid': user.id,
        'username': user.username,
        'exp': datetime.now(timezone.utc) + timedelta(days=TOKEN_EXPIRE_DAYS),
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')


@csrf_exempt
@require_http_methods(['POST', 'OPTIONS'])
def register(request):
    if request.method == 'OPTIONS':
        return JsonResponse({'code': 0})

    data = _body(request)
    username = (data.get('username') or '').strip()
    password = data.get('password') or ''

    if not username or not password:
        return _fail('用户名或密码不能为空')
    if len(password) < 8:
        return _fail('密码不能少于 8 位')
    if len(username) > 50:
        return _fail('用户名不能超过 50 个字符')

    if LoginUser.objects.filter(username=username).exists():
        return _fail('您已经注册过了，请直接登录', code=2)

    LoginUser.objects.create(username=username, password=make_password(password))
    return JsonResponse({'code': 0, 'msg': '注册成功，请登录'})


@csrf_exempt
@require_http_methods(['POST', 'OPTIONS'])
def login_view(request):
    if request.method == 'OPTIONS':
        return JsonResponse({'code': 0})

    data = _body(request)
    username = (data.get('username') or '').strip()
    password = data.get('password') or ''

    if not username or not password:
        return _fail('用户名或密码不能为空')
    if len(password) < 8:
        return _fail('密码不能少于 8 位')

    user = LoginUser.objects.filter(username=username).first()
    if user is None or not check_password(password, user.password):
        return _fail('用户名或密码错误', code=3)

    return JsonResponse({
        'code': 0,
        'msg': '登录成功',
        'token': _issue_token(user),
        'username': user.username,
    })


@require_http_methods(['GET'])
def me(request):
    auth = request.headers.get('Authorization', '')
    if not auth.startswith('Bearer '):
        return _fail('未登录', code=401)
    try:
        payload = jwt.decode(auth[7:], settings.SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        return _fail('登录已过期，请重新登录', code=401)
    except jwt.InvalidTokenError:
        return _fail('登录状态无效', code=401)

    return JsonResponse({
        'code': 0,
        'username': payload.get('username', ''),
        'uid': payload.get('uid'),
    })
