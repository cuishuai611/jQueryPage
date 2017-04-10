<?php
$page = isset($_GET["page"])?$_GET["page"]:1;
$limit = isset($_GET['limit'])?$_GET['limit']:10; 
$re = Array();
for($i=0;$i<$limit;$i++){
	$re[] = Array('id'=>$page.'页'.$i,'title'=>'测试数据id'.'（'.$i.'）');
}
echo json_encode($re);

?>