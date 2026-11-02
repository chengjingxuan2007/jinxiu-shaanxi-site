(function () {
  'use strict';

  /* 后端 Django 服务地址：本地开发默认 8000 端口 */
  var API_BASE = 'http://127.0.0.1:8000/api';

  var form = document.getElementById('authForm');
  if (!form) return;

  var mode = form.dataset.mode || 'login';
  var userField = form.querySelector('[data-field="username"]');
  var passField = form.querySelector('[data-field="password"]');
  var userInput = userField.querySelector('input');
  var passInput = passField.querySelector('input');
  var errorBox = document.getElementById('authError');
  var submitBtn = form.querySelector('.auth-submit');

  function showError(msg) {
    errorBox.textContent = msg;
    errorBox.classList.add('show');
  }

  function clearError() {
    errorBox.textContent = '';
    errorBox.classList.remove('show');
    userField.classList.remove('is-error');
    passField.classList.remove('is-error');
  }

  function markField(field) {
    field.classList.add('is-error');
  }

  [userInput, passInput].forEach(function (input) {
    input.addEventListener('input', clearError);
  });

  function saveSession(data) {
    try {
      localStorage.setItem('sx-token', data.token || '');
      localStorage.setItem('sx-user', data.username || '');
      localStorage.removeItem('sx-guest');
    } catch (e) { /* 隐私模式下忽略 */ }
  }

  /* 登录页 / 注册页之间跳转时携带的提示 */
  var params = new URLSearchParams(location.search);
  var msgKey = params.get('msg');
  var toast = document.getElementById('authToast');
  if (toast && msgKey) {
    var text = {
      registered: '注册成功，请登录',
      exists: '您已经注册过了，请直接登录'
    }[msgKey];
    if (text) {
      toast.textContent = text;
      toast.classList.add('show');
      setTimeout(function () { toast.classList.remove('show'); }, 4200);
    }
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearError();

    var username = userInput.value.trim();
    var password = passInput.value;

    if (!username || !password) {
      if (!username) markField(userField);
      if (!password) markField(passField);
      showError('用户名或密码不能为空');
      return;
    }

    if (password.length < 8) {
      markField(passField);
      showError('密码不能少于 8 位');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = mode === 'login' ? '登录中…' : '提交中…';

    fetch(API_BASE + '/' + mode + '/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (mode === 'login') {
          if (data.code === 0) {
            saveSession(data);
            location.href = './main.html';
            return;
          }
          showError(data.msg || '登录失败');
        } else {
          if (data.code === 0) {
            location.href = './index.html?msg=registered';
            return;
          }
          if (data.code === 2) {
            location.href = './index.html?msg=exists';
            return;
          }
          showError(data.msg || '注册失败');
        }
      })
      .catch(function () {
        showError('无法连接服务器，请先启动 Django 后端（127.0.0.1:8000）');
      })
      .then(function () {
        submitBtn.disabled = false;
        submitBtn.textContent = mode === 'login' ? '登 录' : '注 册';
      });
  });

  /* 游客模式：不写入账号信息，直接进入站点 */
  var guestBtn = document.getElementById('guestBtn');
  if (guestBtn) {
    guestBtn.addEventListener('click', function () {
      try {
        localStorage.removeItem('sx-token');
        localStorage.removeItem('sx-user');
        localStorage.setItem('sx-guest', '1');
      } catch (e) { /* 忽略 */ }
      location.href = './main.html';
    });
  }
})();
