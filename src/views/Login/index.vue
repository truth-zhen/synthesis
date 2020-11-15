<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="login-form"
    >
      <el-form-item prop="username">
        <label for="">用户名</label>
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="pass">
        <label for="">密码</label>
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          :loading="loading"
          type="primary"
          @click="submitForm('ruleForm')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { validUsername } from "@/utils/validate";
export default {
  name: "login",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能小于6位"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: "",
        username: ""
      },
      rules: {
        password: [{ validator: validatePassword, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }]
      },
      loading: false,
      redirect: ""
    };
  },
  mounted() {
    this.getOtherQuery();
  },
  watch: {
    $route: {
      handler: function(route) {
        console.log(route);
        const query = route.query;
        if (query) {
          this.redirect = route.query;
        }
      },
      immediate: true
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/loginStore", this.ruleForm)
            .then(res => {
              this.$router.push("/home");
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //清空
    resetForm() {
      this.$refs.loginForm.resetFields();
    },
    getOtherQuery(query) {}
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: slategrey;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.menu-tab {
  width: 230px;
  height: auto;
  display: flex;
  justify-content: space-around;
  margin-top: -200px;
  margin-bottom: 20px;
  li {
    width: 50px;
    text-align: center;
    line-height: 40px;
    color: white;
    cursor: pointer;
  }
  .current {
    border-bottom: 1px solid orange;
    color: green;
  }
}
.login-form {
  width: 350px;
  margin: 0 auto;
  label {
    color: white;
  }
}
</style>
