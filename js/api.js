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
    const df = $.Deferred();
    setTimeout(() => {
      df.resolve({
        status: "success",
        msg: "成功",
        data: {
          count: Mock.Random.integer(0,200),
          findByPage: result,
        },
      });
    }, 300);
    return df;
  },

  //更新学生数据接口
  updateStudent: function (data) {
    console.log(data);
    const df = $.Deferred();
    setTimeout(() => {
      df.resolve({
        status: "success",
        msg: "成功",
        data: {},
      });
    }, 30);
    return df;
  },

  //删除学生数据接口
  removeStudent: function (sNo) {
    const df = $.Deferred();
    setTimeout(() => {
      df.resolve({
        status: "success",
        msg: "成功",
        data: {},
      });
    }, 30);
    return df;
  },
};
