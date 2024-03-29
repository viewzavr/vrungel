loader
  crit=(m_lambda "(dir) => {
    let r1 = /\.vtk/;
    let f = dir.find( (elem) => r1.test( elem.name ) );
    return f ? 1 : 0
  }")
  load={ |dir,project,active_view|
v:
   visual_process auto_gui2
   title="Лава"
   {{ x-param-slider name="N" min=0 max=(( @blocks->output | geta 0 | geta 1 | geta "length") - 1) }}
   N=0
{

   vis-group scene2d=@scene2d title="Вывод N на экран" {
     scene2d: dom tag="h2" style="color: white; margin: 0" innerText=(join "N=" @v->N);
   };

   blocks_colors: {"block_0":[0,0,1],"block_1":[0,0,1],"block_2":[0,0,1]};

   // найдем различные серии файлов vtk
   blocks: detect-blocks @dir "particledata_(.+)_(\d+)\.vtk$";

   // покажем найденные серии файлов
   read @blocks->output | repeater {
     it: vtk-vis-file title=(@it->input | geta 0) 
                      file=(@it->input | geta 1 | geta @v->N) 
                      default_column="visco_coeffs"
                      color=(@blocks_colors | geta (@it->input | geta 0) default=[1,0,0]) ; //используем цвет для блоков
   };

   vis-group title="OBJ-файлы" {
      // найдем все файлы с расширением .obj и покажем их с помощью obj-vis-file
      find-files @dir "\.obj$" | repeater {
        it: obj-vis-file file=@it->input title=(@it->input | geta "name") color=[0,0.5,0];
      };
   };

};

cam1: camera title="Камера лавы" pos=[-10,45,80] center=[-7,30,0];

  s1: the-view-uni title="Вид на лаву" auto-activate-view
  {
      area sources_str="@v" camera=@cam1;
  };

};