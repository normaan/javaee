
var vm ;

$(function() {
	vm = new Vue({
		el: "#app",
		data: {
			categorys: [] //一级分类集合
		}
	})
	selectF(); //查询一级分类
})

layui.use(['form', 'layer'], function() {
	var form = layui.form,
		layer = layui.layer;
	//表单的提交监听    
	form.on('submit(add)', function(data) {
		$.ajax({
			url: basePath + "category/add",
			type: "post",
			data: data.field,
			dataType: "json",
			success: function(data) {
				if(data.code == 0) {
					layer.msg("操作成功", { icon: 6 });
					setTimeout(function() {
						window.location.href = "category_list.html";
					}, 2000);
				} else {
					layer.msg("操作失败", { icon: 5 });
				}
			},
			error: function() {
				layer.msg("操作失败", { icon: 5 });
			}
		})
		return false;
	})
	
	$("#reback").click(function(){
		window.location.href="category_list.html";
	})
})

//查询一级分类列表
function selectF() {
	$.ajax({
		url: basePath + "category/selectF",
		type: "post",
		data: {},
		dataType: "json",
		success: function(data) {
			if(data.code == 0) {
				vm.categorys = data.categorys; //给vm的一级分类 赋值
				setTimeout(function() {
					layui.form.render(); //更新全部
					//form.render('select', 'test2'); //更新全部
				}, 10)
			}
		}
	})
}

