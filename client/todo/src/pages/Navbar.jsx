// import React from 'react'

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const {toast} = useToast();
  const navigate = useNavigate();

  const handleclickbutton = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout");
      if (res.data.message) {
        if (res.data.message) {
          toast({
            title: "Success",
            description: res.data.message,
            variant: "success",
          });
        }
      }
      navigate("/login");
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-gray-700">
      <div className="max-w-6xl  flex item-center justify-between p-2">
        <h1 className="font-bold text-lg">{"Bicky yadav"}</h1>
        <Button onClick={handleclickbutton}>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
