Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

var cities = ["NE/Omaha.json","CA/Campbell.json","TX/Austin.json","MD/Timonium.json"];


module.exports = cities ;