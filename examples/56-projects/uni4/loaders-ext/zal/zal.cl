// todo: сферы, цилиндры - что у них с параметрами и главное добавками?

// хак
find-objects-bf features="show_3d_scene_r" | x-modify {
  x-set-params camera_control={ |renderer camera target_dom|
      // F-CAMERA-DAMPING
      map-control camera=@camera target_dom=@target_dom renderer=@renderer damping=true;
  };
};


/*
uni-maker code={ |art|
	object 
	  possible=
	  artefact={ |gen|
	  	 ....
	  }
	  visual-process={ |view|

	  }
}
*/
 
/* или вот так:
uni-maker code={ |art| }
 object
	 title="Это вот то"
	 possible=....
	 artefact={ .... } // это делалка артефакта
	 visual={ ...... } // это делалка визуализации
	 operator={ ..... } // это делалка оператора преобразования
	 automatic=true
}
*/

/* вот это и лучше и хуже. лучше тем что можно менять артефакт.
  хуже что по артефакту не сохранить на этапе possible промежуточных данных
  но кстати можно:
artefact-maker
 title="Это вот то"
 possible={ |art| ... }
 data={ |art possible| .... } // это делалка артефакта
 visual={ |art possible view| ...... } // это делалка визуализации
 operator={ |art possible| ..... } // это делалка оператора преобразования
 automatic={ |art| .... }

 но тут везде art таскается и это тупо.
*/

artmaker
 code={ |art|
	 x: object 
	  possible=@x.geom_file?
	  geom_file=(find-files @art.output? "data.*\.(txt)$" | geta 0 default=null)
	  rad_file=(find-files @art.output? "rad.*\.(csv)$" | geta 0 default=null)
	  out_file=(find-files @art.output? ".*\.(out)$" | geta 0 default=null)
	  make={ |gen|
	  	 zal-data geom_file=@x.geom_file rad_file=@x.rad_file out_file=@x.out_file
	  }
	  //{{ console-log "zal possible=" @x.possible (m-eval @x.getPath) }}

  }

feature "zal-data" { 
	x: data-artefact title="Зал" 
	      geom=(load-file @x.geom_file | compalang)
	      rad=(load-file @x.rad_file | text2arr)
	      trajectories=(load-file @x.out_file | xtract_trajs)
}

feature "text2arr" {
	x: object output=(m-eval {: str |
      let r = str.split(/[\s,;]+/);
      if (r.length > 0 && r[ r.length-1].length == 0) r.pop();
      r = r.map( parseFloat )
      //if (isNaN(r[ r.length-1])) r.pop(); // последнее лишнее
      return r
  :} @x.input)
}

// вход: текст out-файла
// выход: список найденных траекторий
feature "xtract_trajs" {
	x: object output=(m-eval {: str=@x.input |
			let res = []
		  let lines = str.split("\n");
		  //console.log("looking trajs, str",lines)
		  for (let i=0; i<lines.length; i++) {
		  	if (lines[i].match(/from first vertex to last vertex/)) {
		  		 // стало быть внутри набор
		  		let j = i;
		  		//console.log( "found traj set", lines[j] );

		  		i++;
		  		//debugger
		  		
		  		for (; i<lines.length; i++) 
				  	if (lines[i].match(/From \(\d+, \d+\) to \(\d+, \d+\), cost/)) {
				  		let traj = [];
				  		let add;
				  		//console.log( "found traj", lines[j],lines[i])
				  		i++
				  		for (; i<lines.length; i++) {
				  		  add = lines[i].match(/vertex \((\d+), (\d+)\)/)
								if (!add) { i--; break }
				  			//console.log("adding",add)
				  			traj.push( 10*parseFloat(add[1]), 0, 10*parseFloat(add[2]) )
				  		}
				  		traj.title = lines[j];
				  		res.push( traj )
				  		
				  		//console.log(traj)
				  	}
				  	else break;

		    }
		  }

		  //console.log("res=",res)
      return res // набор траекторий
  :})
}

/*
feature "text2matr" {
	x: object output=(m-eval {: str |
		  let lines = str.split("\n");
		  //debugger
		  if (lines.length > 0 && lines[ lines.length-1].length == 0) 
		    lines.pop();
		  

		  let cols = (lines[0] || "").split(";");
		  cols.pop();
		  console.log( "readed matr. cols=",cols.length,"lines=",lines.length)

      let r = str.split(/[\s,;]+/);
      if (r.length > 0 && r[ r.length-1].length == 0) r.pop();
      r = r.map( parseFloat )
      //if (isNaN(r[ r.length-1])) r.pop(); // последнее лишнее
      return r
  :} @x.input)
}
*/

vismaker 
  code={ |art|
	  object 
	    title="Визуализация зала"
	 	  possible=(read @art | is-feature-applied name="zal-data")
	  	make={ |view|
	  		paint-zal input=@art
	  	}
  }

///////////////////////////////////  

feature "paint-zal" {
	pz: visual_process 
	    {{ x-art-ref name="input" crit="zal-data" }}
	  	//output=@p.output
	  	title="Зал"
	  	gui={ 
	  	  render-params @pz
	  	  collapsible "radpts" {
	  	  	render-params @radpts manage-addons @radpts
	  	  }	
	  	  collapsible "g2" {
	  	  render-params @g2 manage-addons @g2
	  		}
	  	  collapsible "traj" {
	  	  	render-params @traj_optimal manage-addons @traj_optimal
	  	  }	
	  	  collapsible "measuring_points" {
	  	  	render-params @measuring_points manage-addons @measuring_points
	  	  }	
	  	  collapsible "vertex" {
	  	  	render-params @vertex manage-addons @vertex
	  	  }	
	  	}
	  	scene3d={ |view|
	  	  object output=@node.output

	  	  node: node3d 
	  	    input=(find-objects-bf "node3d" root=@zal | map-geta "output")
	  	  {
	  	  	//points title="Точке" positions=[[[ Array(100*3).fill(0).map( Math.random ) ]]]
	  	  	//zal-paint
	  	  }

	  	  m-eval {: obj=@node.output |
	  	  	let r = 0.01
	  	  	obj.scale.set( r,r,-r )
	  	  	//console.log("setting scale to",obj.scale)
	  	  	//obj.rotation.z = 90 * Math.PI/180;
			//obj.rotation.x = -90 * Math.PI/180;
	  	  :}
	  	 
	  	  //console-log "artefact is" @pz.input "it's output is" @pz.input.output
	  	  //@pz.input.output | create target=@node	  	  

	  	  //console-log "rad is" @pz.input.rad
	  	}
	  	{
	  		insert_children list=@pz.input.geom input=@zal

				zal: object { // среда для моделирования, world -- update а ведь нет, теперь это сцена
	  	  	
	  	  	g: grid // ну это рисование сетки
	  	  	  rangex=(find-objects-bf "RangeX" root=@zal | geta 0 | geta 1)
	  	  	  rangey=(find-objects-bf "RangeY" root=@zal | geta 0 | geta 1)
	  	  	  stepx=(find-objects-bf "GridStep" root=@zal | geta 0 | geta 0)
	  	  	  stepy=(find-objects-bf "GridStep" root=@zal | geta 0 | geta 1)
	  	  	  //gridstep=(find-objects-bf "GridStep" root=@zal | geta 0 | m-eval {: obj | obj ? [obj.params[0], obj.params[1]] : [100,100] :} )
	  	  	  opacity=0.3
	  	  	  visible=false

	  	  	//grid rangex=@g.rangex rangey=@g.rangey gridstep=m-eval [[[ (arr=@g.gridstep) => [ arr[0]*100, arr[1]*100 ] ]]]
	  	  	// надо сделать их тупо независимыми
	  	  	g2: grid rangex=@g.rangex rangey=@g.rangey //gridstep=(m-eval {: arr | [ arr[0]*100, arr[1]*100 ] :} @g.gridstep)
	  	  	  stepx=(@g.stepx * 100) stepy=(@g.stepy * 100)
	  	  	  color=[0,1,0] radius=2 ~editable-addons

	  	  	radpts: points ~editable-addons
	  	  	   positions=(generate_grid_positions_pt rangex=@g.rangex rangey=@g.rangey stepx=@g.stepx stepy=@g.stepy) 
	  	  	   colors=(arr_to_colors input=(@pz.input.rad or []) base_color=[1,0,0])
	  	  	   radius=0.15

	  	  	traj_optimal: cylinders positions=(@pz.input.trajectories.0 | make-strip) radius=10 ~editable-addons color=[0,1,1]
	  	  	//m-eval {: obj=@traj_optimal.output |	let r = 10;	obj.scale.set( r,r,r ) :}

	  	  	//console-log "QQQQ=" @pz.input.trajectories.0

	  	  	   //console-log "A1=" @radpts.positions "A2=" @radpts.colors "a3=" @pz.input.rad

	  	  	measuring_points: spheres ~editable-addons
	  	  	  positions=(find-objects-bf "MeasuringPoint" root=@zal | map { |x| list (10 * @x.0) 0 (10 * @x.1) } | arr_flat)
	  	  	  //positions=(find-objects-bf "MeasuringPoint" root=@zal | map-geta "pos" | arr_flat) 
	  	  	  color=[1,0,0] radius=30 opacity=0.2

	  	    vertex: spheres ~editable-addons
	  	  	  positions=(find-objects-bf "Vertex" root=@zal | map { |x| list (0 + (10 * @x.0)) 0 (10 * @x.1) } | arr_flat)
	  	  	  color=[0,0,1] radius=30 opacity=0.2	  

	  	  }	  		
	  	}
}


feature "MeasuringPoint" {
	x: object //pos=(list (10 * @x->0) 10 (10 * @x->1)) {
//		 node: node3d {
//		   spheres positions=(list @x->0 0 @x->1) color=[1,0,0] radius=30 opacity=0.2
		   //m-eval {: obj=@node.output |	let r = 10;	obj.scale.set( r,r,r ) :} 	
//		 }
	//}
}

feature "measuringPoint" {
	MeasuringPoint
}

// это видимо где надо провести замеры
feature "Vertex" {
	//x: spheres positions=(list @x->0 0 @x->1) radius=100
	x: object {
		 //node: node3d //position=[10,0,0] // сдвиг..
		 //{
		   //spheres positions=(list @x->0 0 @x->1) color=[1,1,1] radius=30
		   //m-eval {: obj=@node.output |	let r = 10;	obj.scale.set( r,r,r ) :}

		   //m-eval {: obj=@n.output | obj.position.set( 30,0,0 ) :}
		 //}
	}	
}

feature "DrawObstacled"
feature "Speed"
feature "RandomPathsCount"
feature "RangeDose"
feature "RandSeed"

feature "ObstacleCircle" {
	x: object {
		 node3d {
		   cylinders nx=100 positions=(list @x->0 0 @x->1 @x->0 500 @x->1) color=[1,1,1] radius=@x->2	 	
		 }
	}
}

feature "ObstaclePolyStart" {
	x: object nodes=(find-objects-bf "ObstaclePolyPoint" root=@x)
	   {
		 node3d {
		 	mesh positions=(m-eval {: nodes=@x.nodes |
		 		let arr = [];
		 		let z = 250
		 		for (let i=0; i<nodes.length; i++) {
		 			let n1 = nodes[i];
		 			let n2 = nodes[ (i+1) % nodes.length];
		 			arr.push( n1.params[0], z, n1.params[1] )
		 			arr.push( n1.params[0], 0, n1.params[1] )
		 			arr.push( n2.params[0], z, n2.params[1] )

		 			arr.push( n1.params[0], 0, n1.params[1] )
		 			arr.push( n2.params[0], 0, n2.params[1] )
		 			arr.push( n2.params[0], z, n2.params[1] )
		 		}
		 		/*
		 		nodes.forEach(node => {
		 			arr.push( node.params[0], 0, node.params[1] )
		 		})*/
		 		return arr
		 	:})
		 }
	   }	
}
feature "ObstaclePolyPoint" {: env |
	//console.log("qq",env.ns.parent)
	let cc = env.ns.parent.ns.getChildren();
	let myindex = cc.indexOf( env );
	let poly = null
	for (let i=myindex-1; i>=0; i--)
	  if (cc[i].is_feature_applied("ObstaclePolyStart")) {
	  	poly = cc[i]
	  	break;
	  }
	//let poly = cc[ cc.length-2 ];
	if (poly && poly.is_feature_applied("ObstaclePolyStart")) 
		poly.ns.appendChild( env, env.ns.name, true ); // переезд
	else {
		console.error("ObstaclePolyPoint cannot find ObstaclePolyStart",env)

	}
:}

feature "grid" {
	x: //object {
		cylinders color=[0, 0.5, 0]
		  positions=(m-eval {: x,y,dx,dy |
	   		  let acc=[];
          for (let i=0; i<=x; i+=dx) {
            acc.push( i, 0, 0 );
            acc.push( i, 0, y );
          };
          for (let i=0; i<=y; i+=dy) {
            acc.push( 0, 0, i );
            acc.push( x, 0, i );
          };
          return acc
		:} @x.rangex @x.rangey @x.stepx @x.stepy )
	//}
}

// параметры rangex rangey dx dy
// output - массив координат
feature "generate_grid_positions_pt" {
	x: object output=(m-eval {: x=@x.rangex y=@x.rangey dx=@x.stepx dy=@x.stepy |
  		    let acc=[];
          
          for (let i=0; i<=x; i+=dx)          
          for (let j=0; j<=y; j+=dy) 
          {
            acc.push( i, 0, j );
          };
          return acc
  :})
}

feature "RangeX" { object }
feature "RangeY" { object }
feature "GridStep" { object }

/////////////////////////////////////

/*

feature "zal" {
	z: object 
	      vertices=[]
		  measuring_points=[] // {x:..., y: ...}
		  measuring_points=(find-objects-bf crit="MeasuringPoint")
		  obstacle_polys=[]
		  obstacle_circles=[]
		  gridx=10
		  gridy=10
		  stepx=1
		  stepy=1
  	  {
	  }
}

feature "zal-paint" {
	p: node3d {
		spheres positions=(to_coords @p.input.measuring_points) color=[1,0,0] radius=100
		spheres positions=(to_coords @p.input.vertices) color=[1,1,1] radius=100
	}
}

// arr: [x,y,x,y,..] => [x,y,z,x,y,z,...]
feature "to_coords" {
	k: output=(m_eval [[[arr => {
		let res = [];
		for (let i=0; i<arr.length; i++)
		  res.push( arr[i].x, 0, arr[i].y )
		return res;  
	}]]] @k.0)
}
*/