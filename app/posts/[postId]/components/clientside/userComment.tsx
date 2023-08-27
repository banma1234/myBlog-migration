"use client";

import { useState } from "react";

export default function CommentBox() {
  const [userComment, setUserComment] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [user, setUser] = useState<string>("");

  const initData = () => {
    setUserComment("");
    setPassword("");
    setUser("");
  };
}
