"use strict";

var c = $('.gameScene')[0],
    ctx = c.getContext("2d"),
    cw = c.width = window.innerWidth,
    ch = c.height = window.innerHeight,
    bg = [],
    fg = {
  img: new Image(),
  x: cw,
  top: 40
},
    // change place running Dino
dino = {
  img: new Image(),
  spriteOffsetX: 0,
  x: cw / 4.5,
  top: 402
},
    eyeLid = {
  img: new Image(),
  spriteOffsetX: 0
},
    dinoJump = {
  img: new Image(),
  spriteOffsetX: 0,
  show: false
},
    dinoJumpGlow = {
  img: new Image(),
  spriteOffsetX: 0,
  show: false
},
    dust1 = {
  img: new Image(),
  spriteOffsetX: 0,
  x: 0,
  y: 0
},
    dust2 = {
  img: new Image(),
  spriteOffsetX: 0,
  x: 0,
  y: 0
},
    // change place fruits(coin)
coin = {
  img: new Image(),
  spriteOffsetX: 0,
  top: 265,
  right: 150,
  show: true
};

window.onmousemove = function (e) {
  gsap.to(dino, {
    duration: 2,
    x: e.clientX - 250,
    overwrite: 'auto'
  });
}; // window.addEventListener('responsive', function (event) {
//   if (viewportWidth < 700) {
//     dino.x = cw/3;
//   }
// });


$(c).on('click', jump);
$(window).on('keydown', function (e) {
  if (e.keyCode == 32) {
    e.preventDefault();
    jump();
  }
});

function jump(e) {
  if (dinoJump.show) return;
  dinoJump.show = true;
  gsap.timeline({
    onComplete: function onComplete() {
      dinoJump.show = false;
    }
  }).fromTo(dinoJump, {
    spriteOffsetX: 0
  }, {
    duration: 0.5,
    spriteOffsetX: 1250,
    ease: 'steps(5)'
  }).call(function () {
    //console.log(cw-dino.x)
    if (cw - dino.x < 475 && cw - dino.x > 325) {
      coin.show = false;
      gsap.to(dinoJumpGlow, {
        duration: 0.3,
        spriteOffsetX: 750,
        ease: 'steps(3)'
      });
    }
  }, null, 0.25);
}

dino.img.src = 'https://assets.codepen.io/721952/gameDino.png';
eyeLid.img.src = 'https://assets.codepen.io/721952/gameBlink.png';
dinoJump.img.src = 'https://assets.codepen.io/721952/gameJump.png';
dinoJumpGlow.img.src = 'https://assets.codepen.io/721952/gameJumpGlow.png';
gsap.to(dino, {
  duration: 0.55,
  spriteOffsetX: 1400,
  ease: 'steps(5)',
  repeat: -1,
  onRepeat: function onRepeat() {
    if (Math.random() < 0.4) gsap.fromTo(eyeLid, {
      spriteOffsetX: 0
    }, {
      duration: 0.55,
      spriteOffsetX: 1400,
      ease: 'steps(5)'
    }); //random blinking
  }
});
gsap.to(dino, {
  duration: 1.2,
  top: 416,
  ease: 'power1.inOut',
  yoyo: true,
  repeat: -1
});
dust1.img.src = dust2.img.src = 'https://assets.codepen.io/721952/gameDust.png';
gsap.to(dust1, {
  duration: 0.6,
  spriteOffsetX: 975,
  ease: 'steps(13)',
  repeat: -1
});
gsap.fromTo(dust1, {
  x: function x() {
    return dino.x + 70;
  }
}, {
  duration: 0.6,
  repeat: -1,
  ease: 'sine',
  x: '-=100',
  repeatRefresh: true
});
gsap.fromTo(dust1, {
  y: function y() {
    return dino.top + 95;
  }
}, {
  duration: 0.6,
  repeat: -1,
  ease: 'sine.in',
  y: '-=50',
  repeatRefresh: true
});
gsap.to(dust2, {
  duration: 0.6,
  delay: 0.2,
  spriteOffsetX: 975,
  ease: 'steps(13)',
  repeat: -1
});
gsap.fromTo(dust2, {
  x: function x() {
    return dino.x + 70;
  }
}, {
  delay: 0.2,
  duration: 0.6,
  repeat: -1,
  ease: 'sine',
  x: '-=50',
  repeatRefresh: true
});
gsap.fromTo(dust2, {
  y: function y() {
    return dino.top + 95;
  }
}, {
  delay: 0.2,
  duration: 0.6,
  repeat: -1,
  ease: 'sine.in',
  y: '-=30',
  repeatRefresh: true
});
fg.img.src = 'https://assets.codepen.io/721952/gameFg.png';
fg.img.onload = moveFg;

function moveFg() {
  if (gsap.isTweening(fg)) return;
  gsap.fromTo(fg, {
    x: cw
  }, {
    duration: gsap.utils.random(2, 3),
    x: -350,
    ease: 'none'
  });
  gsap.delayedCall(gsap.utils.random(3, 5), moveFg);
} // coin.img.src='https://assets.codepen.io/721952/gameCoin.png';
// Change fruits!


coin.img.src = 'assets/images/strawberry.png'; // coin2.img.src='assets/images/strawberry_2.png';
// let cTL = gsap.timeline({paused:true}).to(coin, {spriteOffsetX:400, ease:'steps(5)', repeat:4});

var cTL = gsap.timeline({
  paused: true
}).to(coin, {
  spriteOffsetX: 400,
  ease: 'steps(1)',
  repeat: 0
}); // gsap.to(cTL, {progress:1, duration:1.2, ease:'sine.inOut', repeat:-1});

gsap.to(coin, {
  duration: 0.6,
  yoyo: true,
  repeat: -1,
  top: 310,
  ease: 'sine.inOut'
});

for (var i = 0; i < 5; i++) {
  var img = new Image();
  img.id = i;
  img.src = i == 0 ? 'https://assets.codepen.io/721952/gameLayer0.jpg' : 'https://assets.codepen.io/721952/gameLayer' + i + '.png';
  img.onload = makeLayer;
}

function makeLayer(e) {
  //console.log(e.currentTarget.id)
  var l = {
    img: e.currentTarget,
    fill: ctx.createPattern(e.currentTarget, 'repeat'),
    x: 0,
    y: [55, 55, 55, 0, 525][Number(e.currentTarget.id)],
    width: e.currentTarget.width,
    height: e.currentTarget.height
  };
  bg.push(l);
  l.tl = gsap.timeline({
    repeat: -1
  }).to(l, {
    x: -e.currentTarget.width,
    ease: 'none',
    duration: 6 - Number(e.currentTarget.id)
  });
  bg.sort(function (a, b) {
    // sort layers to maintain correct z-stacking
    return a.img.id > b.img.id ? 1 : -1;
  });
}

gsap.ticker.add(function (a, b, c) {
  cw = $('.gameScene')[0].width = window.innerWidth;
  ch = $('.gameScene')[0].height = window.innerHeight;

  for (var _i = 0; _i < bg.length; _i++) {
    ctx.fillStyle = bg[_i].fill;
    ctx.translate(bg[_i].x, bg[_i].y);
    ctx.fillRect(0, 0, cw + bg[_i].width, bg[_i].height);
    ctx.translate(-bg[_i].x, -bg[_i].y);
  }

  if (!dinoJump.show) ctx.drawImage(dust1.img, dust1.spriteOffsetX, 0, 75, 55, dust1.x, dust1.y, 75, 55);
  if (dinoJump.show) ctx.drawImage(dinoJump.img, dinoJump.spriteOffsetX, 0, 250, 240, dino.x, dino.top - 100, 250, 240);else {
    ctx.drawImage(dino.img, dino.spriteOffsetX, 0, 280, 140, dino.x, dino.top, 280, 140);
    ctx.drawImage(eyeLid.img, eyeLid.spriteOffsetX, 0, 280, 140, dino.x, dino.top, 280, 140);
  }
  ctx.drawImage(dust2.img, dust2.spriteOffsetX, 0, 75, 55, dust2.x, dust2.y, 75, 55);

  if (coin.show) {
    ctx.globalCompositeOperation = 'screen';
    ctx.drawImage(coin.img, coin.spriteOffsetX, 0, 80, 80, cw - coin.right, coin.top, 80, 80);
    ctx.globalCompositeOperation = 'source-over';
  } else {
    ctx.drawImage(dinoJumpGlow.img, dinoJumpGlow.spriteOffsetX, 0, 250, 240, dino.x, dino.top - 100, 250, 240);
  }

  ctx.drawImage(fg.img, fg.x, fg.top, 350, 90);
});