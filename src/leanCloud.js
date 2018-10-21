import AV from 'leancloud-storage'

var APP_ID = 'qabrTc8amuSgtNjWaAeyyCSc-gzGzoHsz';
var APP_KEY = 'vx0Ln8QRoKGxwVkJ8cNAY0UE';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export function signUp(username, password, successFn, errorFn) {
  //新建 AV user 对象实例
  var user = new AV.User();
  //设置用户名
  user.setUsername(username);
  //设置密码
  user.setPassword(password);
  //设置邮箱
  user.signUp().then(function(loginedUser) {
    let user = getUserFormAVUser(loginedUser);
    successFn.call(null, user);
  }, function(error) {
    errorFn.call(null, error);
  })
}

export function signIn(username, password, successFn, errorFn) {
  AV.User.logIn(username, password).then(function(loginedUser) {
    let user = getUserFormAVUser(loginedUser);
    successFn.call(null, user);
  }, function(error) {
    errorFn.call(null, error);
  });
}

export function getCurrentUser() {
  let user = AV.User.current();
  console.log(user);
  return user ? getUserFormAVUser(user) : null;
}

export function signOut() {
  AV.User.logOut();
}

function getUserFormAVUser(AVUser) {
  return {
    id: AVUser.id,
    ...AVUser.attributes,
  }
}

export default AV;