const ffi = require('ffi-napi');
const ref = require('ref-napi');

// 定义 C 的 `char *` 类型
const charPtr = ref.refType(ref.types.CString);

// 加载 Rust 编译后的共享库
const lib = ffi.Library('./target/release/libmy_rust_lib', {
  'greet': [charPtr, []],
  'free_greet': ['void', [charPtr]]
});

// 调用 Rust 函数
const messagePtr = lib.greet();
const message = ref.readCString(messagePtr, 0);
console.log(message);

// 释放在 Rust 中分配的内存
lib.free_greet(messagePtr);
