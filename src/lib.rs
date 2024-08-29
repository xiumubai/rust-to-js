use std::ffi::{CStr, CString};
use std::os::raw::c_char;

#[no_mangle]
pub extern "C" fn greet() -> *const c_char {
    let s = CString::new("Hello from Rust!").unwrap();
    s.into_raw()
}

#[no_mangle]
pub extern "C" fn free_greet(s: *mut c_char) {
    if s.is_null() { return }
    unsafe {
        CString::from_raw(s);
    }
}
