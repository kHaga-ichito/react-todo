import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const MaxInputNum = 5;
  const [todoText, SetTodoText] = useState("");

  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const onChangeTodoText = (event) => SetTodoText(event.target.value);
  const onCLickAdd = () => {
    if (todoText === "") return;

    //既存の未完了リスト + TODO入力内容を取得
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    SetTodoText("");
  };
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos]; // 現在の未完了リスト取得
    newTodos.splice(index, 1); // 配列上のindex番目から第二引数分だけ削除
    setIncompleteTodos(newTodos);
  };
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos]; // 現在の未完了リスト取得
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };
  const onClickBack = (index) => {
    //alert("back  " + index);
    const newCompleteTodos = [...completeTodos]; // 現在の完了リスト取得
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onCLickAdd}
        disabled={incompleteTodos.length >= MaxInputNum}
      />
      {incompleteTodos.length >= MaxInputNum && (
        <p style={{ color: "red" }}>登録できるのは5個まで</p>
      )}

      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
