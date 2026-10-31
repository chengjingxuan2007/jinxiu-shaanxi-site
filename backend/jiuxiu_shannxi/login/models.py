from django.db import models


class LoginUser(models.Model):
    username = models.CharField('用户名', max_length=50, unique=True)
    password = models.CharField('密码', max_length=128)
    created_at = models.DateTimeField('注册时间', auto_now_add=True)

    class Meta:
        db_table = 'login_user'
        verbose_name = '登录用户'
        verbose_name_plural = '登录用户'

    def __str__(self):
        return self.username
