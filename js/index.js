const nowPage = 1;
const pageSize= 10;
const allPage = 0;
let tableData=[];

//点击事件绑定
function bindEvent() {
  $(".menu").on("click", "dd", function () {
    $(this).addClass("active").siblings().removeClass("active");
    const id = $(this).data("id");
    $("#" + id).siblings().fadeOut().end().fadeIn();
  });
  //编辑学生信息
  $('#tbody').on('click', '.edit', function(){ 
      const index = $(this).parents('tr').index();
      renderEditForm(tableData[index]);
      $('.modal').slideDown();
  });
  $('#edit-student-btn').click(function(e){
    e.preventDefault();
    //拿到表单里面的学生数据
    const data = dealFormData($('#edit-student-form').serializeArray());
    const response=api.updateStudent(data);
    if(response.status === 'success'){
        getTableData();
        $('.modal').slideUp();
    }
  });
  $('.modal').click(function(e){
        if(this === e.target){
          $(this).slideUp();
        }
  });
  //删除学生信息
  $('#tbody').on('click', '.remove', function(){ 
    const index = $(this).parents('tr').index();
    const student = tableData[index];
    const isDel = confirm(`确定删除学号为${student.sNo}的学生吗?`);
    if(isDel){
       const response = api.removeStudent(student.sNo);
       if(response.status == 'success'){
         getTableData();
       }
    }
});
}
bindEvent();

/**
 * 获取表单数据
 */
function getTableData(){
  let response = api.apiGetStudentData({
     page: nowPage,
     size: pageSize,
   });
   if(response.status === "success"){
     tableData = response.data.findByPage;
     count = response.data.count;
     renderTable(tableData);
   }
   alert(response.msg);
 }
 getTableData();

 /**
  * 渲染表单数据
  * @param {*} data 
  */
function renderTable(data){
    let str = data.reduce((prev,item)=>{
      return prev+`<tr>
      <td>${item.sNo}</td>
      <td>${item.name}</td>
      <td>${item.sex ? '女' : '男'}</td>
      <td>${item.email}</td>
      <td>${+(new Date().getFullYear() - item.birth)}</td>
      <td>${item.phone}</td>
      <td>${item.address}</td>
      <td>
          <button class="edit btn">编辑</button>
          <button class="remove btn">删除</button>
      </td>
  </tr>`
    },'');
    $('#tbody').html(str);
}

/**
 * 编辑表单的数据回填
 * @param {*} data 
 */
function renderEditForm(data){
  const form = $('#edit-student-form')[0];
  for (let prop in data){
    if(form[prop]){
      form[prop].value = data[prop];
    }
  }
}

/**
 * 获取编辑后的数据
 * @param {*} arr 
 */
function dealFormData(arr){
   const obj={};
   arr.forEach((item)=>{
     obj[item.name] = item.value;
   });
}
