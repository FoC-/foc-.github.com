define(function() {
  "use strict";
  var canvas = document.getElementById('intro-background');
  var context = (canvas && canvas.getContext) ? canvas.getContext('2d') : undefined;

  function Round(number, basis) {
    basis = basis || 1;
    return Math.round(number * basis) / basis;
  };

  function PowE(exponent) {
    exponent = exponent || 1;
    return Math.pow(Math.E, exponent);
  };

  function Random(min, max) {
    return (Math.random() * (max - min + 1) | 0) + min;
  };

  function ChaoticMath() {
    this.firstFunction = Random(1, 2);
    this.secondFunction = Random(1, 3);
    this.inverted = Random(1, 2);
    this.dispersion = Random(10, 25) / 1000;
  };

  ChaoticMath.prototype.calculate = function(value) {
    // Dispersion
    value = this.dispersion * value;
    // Main  function should be repeatable
    switch (this.firstFunction) {
      case 2:
        value = Math.cos(value);
        break;
      case 1:
        value = Math.sin(value);
    }
    // Another function could be any or none
    switch (this.secondFunction) {
      case 3:
        break;
      case 2:
        value = Math.cos(value);
        break;
      case 1:
        value = Math.sin(value);
    }
    // Invert some or not invert
    switch (this.inverted) {
      case 2:
        break;
      case 1:
        value = -1 * value;
    }
    return value;
  };

  function Color(y, u, v) {
    function normalizeColor(component) {
      if (component < 0) return 0;
      if (component > 255) return 255;
      return Math.floor(component);
    };

    var r = normalizeColor(y + 1.4075 * (v - 128));
    var g = normalizeColor(y - 0.3455 * (u - 128) - (0.7169 * (v - 128)));
    var b = normalizeColor(y + 1.7790 * (u - 128));
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  };

  function Dot(position) {
    this.x = 0;
    this.y = 0;
    this.setNewColor();
    this.size = 3;
    this.position = position;
    this.speed = Random(100, 150) / 100;
    this.fn = new ChaoticMath();
  };

  Dot.prototype.setNewColor = function() {
    // Header (44, 165, 96)  Background (251, 129, 123) Like Color(Random(200, 235), 155, 102)
    this.color = Color(Random(200, 235), 155, 102);
  };

  Dot.prototype.updatePosition = function() {
    if (this.x > canvas.width) {
      this.x = 0;
      this.setNewColor();
    }

    this.x += this.speed;
    var r = canvas.width - this.x;
    this.y = Round(0.01 * PowE(0.006 * r) * this.fn.calculate(r) + this.position);
  };

  Dot.prototype.render = function(ctx) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(this.x, this.y);
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
    ctx.fill();
  };

  function loop(f) {
    setTimeout(function() {
      f();
      loop(f);
    }, 1000 / 60);
  };

  (function() {
    if (context) {
      canvas.width = 1680;
      canvas.height = 700;
      var dotsNumber = 20;

      var startPosition = (canvas.height - dotsNumber * 15) / 2;
      var dots = [];
      for (var i = 0; i < dotsNumber; i++) {
        dots[i] = new Dot(startPosition + i * 15);
      };

      loop(function() {
        for (var i = 0; i < dotsNumber; i++) {
          dots[i].updatePosition();
          dots[i].render(context);
        };
      });
    }
  })();
});
