// Import stylesheets
import './style.css';
import './jquery-3.1.1.min.js';
import $ from 'http://code.jquery.com/jquery-1.11.0.min.js';

var jQueryScript = document.createElement('script');
jQueryScript.setAttribute(
  'src',
  'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js'
);

document.head.appendChild(jQueryScript);

// Body element
const body = document.getElementById('body');

// Button elements
const btnSend = document.getElementById('btnSend');
const btnClose = document.getElementById('btnClose');
const btnShare = document.getElementById('btnShare');
const btnLogIn = document.getElementById('btnLogIn');
const btnLogOut = document.getElementById('btnLogOut');
const btnScanCode = document.getElementById('btnScanCode');
const btnOpenWindow = document.getElementById('btnOpenWindow');

// Profile elements
const email = document.getElementById('email');
const userId = document.getElementById('userId');
const pictureUrl = document.getElementById('pictureUrl');
const displayName = document.getElementById('displayName');
const statusMessage = document.getElementById('statusMessage');

// QR element
const code = document.getElementById('code');
const friendShip = document.getElementById('friendShip');

async function main() {
  // Initialize LIFF app)

  // Try a LIFF function
  await liff.init({ liffId: '1656807447-q4ND4Wbn' });
  getUserProfile();
  if (!liff.isInClient()) {
    if (liff.isLoggedIn()) {
      btnLogIn.style.display = 'none';
      btnLogOut.style.display = 'block';
      getUserProfile();
    } else {
      btnLogIn.style.display = 'block';
      btnLogOut.style.display = 'none';
    }
  } else {
    getUserProfile();
    btnSend.style.display = 'block';
    btnProfile.style.display = 'block';
  }
}
async function getUserProfile() {
  const profile = await liff.getProfile();
  pictureUrl.src = profile.pictureUrl;
  userId.innerHTML = '<b>userId:</b> ' + profile.userId;
  statusMessage.innerHTML = '<b>statusMessage:</b> ' + profile.statusMessage;
  displayName.innerHTML = '<b>displayName:</b> ' + profile.displayName;
  email.innerHTML = '<b>email:</b> ' + liff.getDecodedIDToken().email;
}
btnLogIn.onclick = () => {
  liff.login();
};

btnLogOut.onclick = () => {
  liff.logout();
  window.location.reload();
};
async function sendMsg() {
  if (
    liff.getContext().type !== 'none' &&
    liff.getContext().type !== 'external'
  ) {
    await liff.sendMessages([
      {
        type: 'text',
        text: 'This message was sent by sendMessages()',
      },
    ]);
    alert('Message sent');
  }
}

async function CallServiceSaveProfile() {
  const profile = await liff.getProfile();
  // alert(profile);

  // alert(url);
  let url = 'http://192.168.1.244:5050/getrevenueinv/revenue0?com=813';

  alert(url);

  $.ajax({
    method: 'GET',
    url: 'http://192.168.1.29:5000/saveData',
  }).done(function (res) {
    alert(res);
  });
}

btnSend.onclick = () => {
  sendMsg();
};
btnProfile.onclick = () => {
  CallServiceSaveProfile();
};
main();
