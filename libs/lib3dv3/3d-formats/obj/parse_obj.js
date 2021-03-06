/*
### преобразует массив строк obj в js-объект с его содержимым, весьма банальной структуры ~
### по мотивам
### https://github.com/mikolalysenko/parse-obj/blob/master/parse-obj.js
### и https://dev.to/uilicious/javascript-array-push-is-945x-faster-than-array-concat-1oki
*/

// input: lines - a string of obj file (not an array)
export function parse_obj(lines) {
  //console.time("parse_obj");
  
  var xyz=[];
  var iii=[];

/* идея была хороша, но пуша там нет  
  var x = new Float32Array();
  var y = new Float32Array();
  var z = new Float32Array();
  var i1 = new Uint32Array();
  var i2 = new Uint32Array();
  var i3 = new Uint32Array();
*/  
/*  
  var vn = []
  var vt = []
  var f = []
  var fn = []
  var ft = []
*/
  
  var perliner = function(line) {
      if(line.length === 0 || line.charAt(0) === "#") {
        return
      }
      var toks = line.split(" ")
      switch(toks[0]) {
        case "v":
          if(toks.length < 3) {
            throw new Error("parse-obj: Invalid vertex :" + line)
          }
          xyz.push(+toks[1]);
          xyz.push(+toks[2]);
          xyz.push(+toks[3]);
          //xyz.push([+toks[1], +toks[2], +toks[3]])
        break

        case "vn":
        break; // нафиг эти мне нормали..
          if(toks.length < 3) {
            throw new Error("parse-obj: Invalid vertex normal:"+ line)
          }
          vn.push([+toks[1], +toks[2], +toks[3]])
        break

        case "vt":
        break; // не используем и это
          if(toks.length < 2) {
            throw new Error("parse-obj: Invalid vertex texture coord:" + line)
          }
          vt.push([+toks[1], +toks[2]])
        break

        case "f":
          iii.push( parseInt(toks[1])-1 );
          iii.push( parseInt(toks[2])-1 );
          iii.push( parseInt(toks[3])-1 );
          //i1.push( (toks[2].split("/")[0]|0)-1 );
          break; // лесом все
          var normal = new Array(toks.length-1)
          var texCoord = new Array(toks.length-1)
          for(var i=1; i<toks.length; ++i) {
            var indices = toks[i].split("/")
            position[i-1] = (indices[0]|0)-1
            texCoord[i-1] = indices[1] ? (indices[1]|0)-1 : -1
            normal[i-1] = indices[2] ? (indices[2]|0)-1 : -1
          }
          f.push(position)
          fn.push(normal)
          ft.push(texCoord)
        break

        case "vp":
        case "s":
        case "o":
        case "g":
        case "usemtl":
        case "mtllib":
          //Ignore this crap
        break

        default:
          //throw new Error("parse-obj: Unrecognized directive: '" + toks[0] + "'")
      } // switch
    }
    
  var lines_arr = lines.split(/\n/);
  for (var i=0; i<lines_arr.length; i++ )
  {
    perliner( lines_arr[i] );
  }
  //console.timeEnd("parse_obj");
  
  var res = { XYZ: new Float32Array(xyz), indices: new Uint32Array(iii), length: xyz.length }

/*  
  var res = {
        X:x, Y:y, Z:z,
        I1:i1, I2:i2, I3:i3
  }
*/
  /*        
  var res = {        
        positions: v,
        normals: vn,
        uvs: vt,
        indices: f,
        indices_f3: fn,
        indicec_f3_uvs: ft
      }
  */    
  return res;
}