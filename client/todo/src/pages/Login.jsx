// import React from 'react'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useState } from "react";

const Login = () => {
  const { toast } = useToast();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast({
            title: "Success",
            description: res.data.message,
            variant: "success",
        });
    }
    } catch(error) {
        toast({
            title: "Error",
            description: error.response?.data?.message || "Something went wrong",
            variant: "destructive",
          });
    }
  };

  return (
    <div className="">
      <Input
        value={user.email}
        onChange={changeHandler}
        type="text"
        name="email"
        placeholder="enter you email"
      />
      <Input
        value={user.password}
        onChange={changeHandler}
        name="password"
        type="password"
        placeholder="enter your password"
      />
      <Button onClick={loginHandler}>Click Me</Button>
    </div>
  );
};

export default Login;
