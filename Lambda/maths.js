module.exports ={
  getFactorial: function(num)
  {
      if (num === 0){
        return 1;
      }
      else{
        return num * module.exports.getFactorial(num - 1);
      }
  },

  getSquare: function(num)
  {
    var result= Math.pow(num, 2);
    return result;
  },

  getAreaOfSquare: function(side){
    return side*side;
  },

  getAreaOfCircle: function(radius){
    return ((22*radius*radius)/7).toFixed(2);
  },

  getAreaOfRectangle: function(length,breadth){
    return length*breadth;
  },

  getAreaOfTriangle: function(base,height) {
    return (base*height)/2;
  },

  getSpeechForShape: function(shape) {
    var input;
    switch (shape) {
      case 'circle':
        input='radius';
        break;
      case 'triangle':
        input='base';
      break;
      case 'square':
        input='side';
      break;
      case 'rectangle':
        input='length';
      break;
      default:
      return "Invalid shape";
    }
    return  "what is the value of "+input+" of the "+shape;
  }
};
