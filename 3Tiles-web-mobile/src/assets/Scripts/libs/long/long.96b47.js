(function(i,t){"function"==typeof define&&define.amd?define([],t):"function"==typeof require&&"object"==typeof module&&module&&module.exports?module.exports=t():(i.dcodeIO=i.dcodeIO||{}).Long=t()})(this,function(){function i(i,t,n){this.low=0|i,this.high=0|t,this.unsigned=!!n}function t(i){return!0===(i&&i.__isLong__)}function n(i,t){var n,e;if(t){if((e=0<=(i>>>=0)&&256>i)&&(n=o[i]))return n;n=h(i,0>(0|i)?-1:0,!0),e&&(o[i]=n)}else{if((e=-128<=(i|=0)&&128>i)&&(n=u[i]))return n;n=h(i,0>i?-1:0,!1),e&&(u[i]=n)}return n}function e(i,t){if(isNaN(i)||!isFinite(i))return t?c:d;if(t){if(0>i)return c;if(i>=f)return b}else{if(i<=-a)return p;if(i+1>=a)return N}return 0>i?e(-i,t).neg():h(i%4294967296|0,i/4294967296|0,t)}function h(t,n,e){return new i(t,n,e)}function s(i,t,n){if(0===i.length)throw Error("empty string");if("NaN"===i||"Infinity"===i||"+Infinity"===i||"-Infinity"===i)return d;if("number"==typeof t?(n=t,t=!1):t=!!t,2>(n=n||10)||36<n)throw RangeError("radix");var h;if(0<(h=i.indexOf("-")))throw Error("interior hyphen");if(0===h)return s(i.substring(1),t,n).neg();h=e(g(n,8));for(var r=d,u=0;u<i.length;u+=8){var o=Math.min(8,i.length-u),f=parseInt(i.substring(u,u+o),n);8>o?(o=e(g(n,o)),r=r.mul(o).add(e(f))):r=(r=r.mul(h)).add(e(f))}return r.unsigned=t,r}function r(t){return t instanceof i?t:"number"==typeof t?e(t):"string"==typeof t?s(t):h(t.low,t.high,t.unsigned)}Object.defineProperty(i.prototype,"__isLong__",{value:!0,enumerable:!1,configurable:!1}),i.isLong=t;var u={},o={};i.fromInt=n,i.fromNumber=e,i.fromBits=h;var g=Math.pow;i.fromString=s,i.fromValue=r;var f=0x10000000000000000,a=f/2,l=n(16777216),d=n(0);i.ZERO=d;var c=n(0,!0);i.UZERO=c;var v=n(1);i.ONE=v;var w=n(1,!0);i.UONE=w;var m=n(-1);i.NEG_ONE=m;var N=h(-1,2147483647,!1);i.MAX_VALUE=N;var b=h(-1,-1,!0);i.MAX_UNSIGNED_VALUE=b;var p=h(0,-2147483648,!1);i.MIN_VALUE=p;var E=i.prototype;return E.toInt=function(){return this.unsigned?this.low>>>0:this.low},E.toNumber=function(){return this.unsigned?4294967296*(this.high>>>0)+(this.low>>>0):4294967296*this.high+(this.low>>>0)},E.toString=function(i){if(2>(i=i||10)||36<i)throw RangeError("radix");if(this.isZero())return"0";if(this.isNegative()){if(this.eq(p)){var t=e(i);return t=(n=this.div(t)).mul(t).sub(this),n.toString(i)+t.toInt().toString(i)}return"-"+this.neg().toString(i)}for(var n=e(g(i,6),this.unsigned),h=(t=this,"");;){var s=t.div(n),r=(t.sub(s.mul(n)).toInt()>>>0).toString(i);if((t=s).isZero())return r+h;for(;6>r.length;)r="0"+r;h=""+r+h}},E.getHighBits=function(){return this.high},E.getHighBitsUnsigned=function(){return this.high>>>0},E.getLowBits=function(){return this.low},E.getLowBitsUnsigned=function(){return this.low>>>0},E.getNumBitsAbs=function(){if(this.isNegative())return this.eq(p)?64:this.neg().getNumBitsAbs();for(var i=0!=this.high?this.high:this.low,t=31;0<t&&0==(i&1<<t);t--);return 0!=this.high?t+33:t+1},E.isZero=function(){return 0===this.high&&0===this.low},E.isNegative=function(){return!this.unsigned&&0>this.high},E.isPositive=function(){return this.unsigned||0<=this.high},E.isOdd=function(){return 1==(1&this.low)},E.isEven=function(){return 0==(1&this.low)},E.equals=function(i){return t(i)||(i=r(i)),(this.unsigned===i.unsigned||1!=this.high>>>31||1!=i.high>>>31)&&this.high===i.high&&this.low===i.low},E.eq=E.equals,E.notEquals=function(i){return!this.eq(i)},E.neq=E.notEquals,E.lessThan=function(i){return 0>this.comp(i)},E.lt=E.lessThan,E.lessThanOrEqual=function(i){return 0>=this.comp(i)},E.lte=E.lessThanOrEqual,E.greaterThan=function(i){return 0<this.comp(i)},E.gt=E.greaterThan,E.greaterThanOrEqual=function(i){return 0<=this.comp(i)},E.gte=E.greaterThanOrEqual,E.compare=function(i){if(t(i)||(i=r(i)),this.eq(i))return 0;var n=this.isNegative(),e=i.isNegative();return n&&!e?-1:!n&&e?1:this.unsigned?i.high>>>0>this.high>>>0||i.high===this.high&&i.low>>>0>this.low>>>0?-1:1:this.sub(i).isNegative()?-1:1},E.comp=E.compare,E.negate=function(){return!this.unsigned&&this.eq(p)?p:this.not().add(v)},E.neg=E.negate,E.add=function(i){t(i)||(i=r(i));var n,e=this.high>>>16,s=65535&this.high,u=this.low>>>16,o=i.high>>>16,g=65535&i.high,f=i.low>>>16;return i=0+((n=(65535&this.low)+(65535&i.low)+0)>>>16),u=0+((i+=u+f)>>>16),h((65535&i)<<16|65535&n,(s=(s=0+((u+=s+g)>>>16))+(e+o)&65535)<<16|65535&u,this.unsigned)},E.subtract=function(i){return t(i)||(i=r(i)),this.add(i.neg())},E.sub=E.subtract,E.multiply=function(i){if(this.isZero())return d;if(t(i)||(i=r(i)),i.isZero())return d;if(this.eq(p))return i.isOdd()?p:d;if(i.eq(p))return this.isOdd()?p:d;if(this.isNegative())return i.isNegative()?this.neg().mul(i.neg()):this.neg().mul(i).neg();if(i.isNegative())return this.mul(i.neg()).neg();if(this.lt(l)&&i.lt(l))return e(this.toNumber()*i.toNumber(),this.unsigned);var n,s,u,o,g=this.high>>>16,f=65535&this.high,a=this.low>>>16,c=65535&this.low,v=i.high>>>16,w=65535&i.high,m=i.low>>>16;return u=0+((o=0+c*(i=65535&i.low))>>>16),s=0+((u+=a*i)>>>16),s+=(u=(65535&u)+c*m)>>>16,n=0+((s+=f*i)>>>16),n+=(s=(65535&s)+a*m)>>>16,s&=65535,h((u&=65535)<<16|65535&o,(n=(n+=(s+=c*w)>>>16)+(g*i+f*m+a*w+c*v)&65535)<<16|(s&=65535),this.unsigned)},E.mul=E.multiply,E.divide=function(i){if(t(i)||(i=r(i)),i.isZero())throw Error("division by zero");if(this.isZero())return this.unsigned?c:d;var n,h,s;if(this.unsigned){if(i.unsigned||(i=i.toUnsigned()),i.gt(this))return c;if(i.gt(this.shru(1)))return w;s=c}else{if(this.eq(p))return i.eq(v)||i.eq(m)?p:i.eq(p)?v:(n=this.shr(1).div(i).shl(1)).eq(d)?i.isNegative()?v:m:(h=this.sub(i.mul(n)),n.add(h.div(i)));if(i.eq(p))return this.unsigned?c:d;if(this.isNegative())return i.isNegative()?this.neg().div(i.neg()):this.neg().div(i).neg();if(i.isNegative())return this.div(i.neg()).neg();s=d}for(h=this;h.gte(i);){n=Math.max(1,Math.floor(h.toNumber()/i.toNumber()));for(var u=48>=(u=Math.ceil(Math.log(n)/Math.LN2))?1:g(2,u-48),o=e(n),f=o.mul(i);f.isNegative()||f.gt(h);)f=(o=e(n-=u,this.unsigned)).mul(i);o.isZero()&&(o=v),s=s.add(o),h=h.sub(f)}return s},E.div=E.divide,E.modulo=function(i){return t(i)||(i=r(i)),this.sub(this.div(i).mul(i))},E.mod=E.modulo,E.not=function(){return h(~this.low,~this.high,this.unsigned)},E.and=function(i){return t(i)||(i=r(i)),h(this.low&i.low,this.high&i.high,this.unsigned)},E.or=function(i){return t(i)||(i=r(i)),h(this.low|i.low,this.high|i.high,this.unsigned)},E.xor=function(i){return t(i)||(i=r(i)),h(this.low^i.low,this.high^i.high,this.unsigned)},E.shiftLeft=function(i){return t(i)&&(i=i.toInt()),0==(i&=63)?this:32>i?h(this.low<<i,this.high<<i|this.low>>>32-i,this.unsigned):h(0,this.low<<i-32,this.unsigned)},E.shl=E.shiftLeft,E.shiftRight=function(i){return t(i)&&(i=i.toInt()),0==(i&=63)?this:32>i?h(this.low>>>i|this.high<<32-i,this.high>>i,this.unsigned):h(this.high>>i-32,0<=this.high?0:-1,this.unsigned)},E.shr=E.shiftRight,E.shiftRightUnsigned=function(i){if(t(i)&&(i=i.toInt()),0==(i&=63))return this;var n=this.high;return 32>i?h(this.low>>>i|n<<32-i,n>>>i,this.unsigned):h(32===i?n:n>>>i-32,0,this.unsigned)},E.shru=E.shiftRightUnsigned,E.toSigned=function(){return this.unsigned?h(this.low,this.high,!1):this},E.toUnsigned=function(){return this.unsigned?this:h(this.low,this.high,!0)},E.toBytes=function(i){return i?this.toBytesLE():this.toBytesBE()},E.toBytesLE=function(){var i=this.high,t=this.low;return[255&t,t>>>8&255,t>>>16&255,t>>>24&255,255&i,i>>>8&255,i>>>16&255,i>>>24&255]},E.toBytesBE=function(){var i=this.high,t=this.low;return[i>>>24&255,i>>>16&255,i>>>8&255,255&i,t>>>24&255,t>>>16&255,t>>>8&255,255&t]},i});