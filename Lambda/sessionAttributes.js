module.exports ={
  setShapeAttribute: function(sessionAttributes,shape) {
    sessionAttributes.shape=shape;
    return sessionAttributes;
  },
  setLengthAttribute: function(sessionAttributes,length) {
    sessionAttributes.length=length;
    return sessionAttributes;
  },
  setBaseAttribute: function(sessionAttributes,base) {
    sessionAttributes.base=base;
    return sessionAttributes;
  }
};
