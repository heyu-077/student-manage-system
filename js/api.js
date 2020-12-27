//用monk.js模拟数据

const api = {

  //获取学生数据接口
  apiGetStudentData: function (data) {
    const result = [];
    const size = data.size || 10;
    for (let i = 0; i < size; i++) {
      result.push(
        Mock.mock({
          sNo: Mock.Random.integer(999, 999999999),
          name: "@name",
          sex: Mock.Random.integer(0, 1),
          birth: "@date('yyyy')",
          phone: /^1[3-9]\d{9}$/,
          email: "@email",
          address: Mock.Random.county(true),
        })
      );
    }
    return {
        status: 'success',
        msg: '成功',
        data:{
            count: Mock.Random.integer(),
            findByPage: result
        }
    };
  },

  //更新学生数据接口
  updateStudent: function(data){
        console.log(data);
        return {
            status: 'success',
            msg: '成功',
            data: {}
        }
  },

  //删除学生数据接口
  removeStudent: function(sNo){
    console.log(sNo);
    return {
        status: 'success',
        msg: '成功',
        data: {}
    }
  }
};
