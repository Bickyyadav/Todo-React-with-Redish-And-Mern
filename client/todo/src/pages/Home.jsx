// import React from 'react'

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todo, setTodo] = useState([]);
  const { toast } = useToast();

  const handlechanged = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo/createTodo",
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      alert(res.data.message);

      if (res.data.message) {
        toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
        });
        setTodo([...todo, res.data.todo]);
        setTitle("");
        setDescription("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.message || "Something went wrong",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const fetchtodo = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/todo/getTodo"
        );

        if (res.statusText == "OK") {
          setTodo(res.data.Todo);
        }
        toast({
          title: "Success",
          description: res.data.message,
          variant: "success",
        });
      } catch (error) {
        toast({
          title: "Error",
          description: error.response?.data?.message || "Something went wrong",
          variant: "destructive",
        });
      }
    };
    fetchtodo();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="flex items-center gap-5 mt-5">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="enter the text"
          className="w-1/4"
        />
        <Button onClick={handlechanged}>Add todo:</Button>
      </div>

      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="write a description"
        className="w-1/4 mt-2"
      />

      {todo.map((todos) => {
        return (
          <Card key={todos._id}>
            <CardHeader>
              <CardTitle>{todos.title}</CardTitle>
              <CardDescription>{todos.description}</CardDescription>
            </CardHeader>
          </Card>
        );
      })}
    </div>
  );
};

export default Home;
