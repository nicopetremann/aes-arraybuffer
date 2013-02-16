// test examples from http://csrc.nist.gov/publications/fips/fips197/fips-197.pdf

/*
console.log("test_aes_cbc_symmetric");
console.log("input="+BufferUtils.buffer_hex_string(input));
console.log("key="+BufferUtils.buffer_hex_string(key));
console.log("iv="+BufferUtils.buffer_hex_string(iv));
console.log("encrypted="+BufferUtils.buffer_hex_string(encrypted));
console.log("expected_encrypted="+BufferUtils.buffer_hex_string(expected_encrypted));
console.log("decrypted="+BufferUtils.buffer_hex_string(decrypted));
*/

test("Key expansion", function() {

  function endian_swap32_array(a) {
    var swapped = new Uint32Array(a.length);

    for (var i = 0; i < a.length; i++) {
      swapped[i] = AES.endian_swap32(a[i]);
    }

    return swapped;
  }

  function swap_if_little_endian(a) {
    if (!AES.is_little_endian) {
      return a;
    }

    return endian_swap32_array(a);
  }

  var key128 = new Uint8Array([
    0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6,
    0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c
  ]);
  var expected_expansion_key128 = swap_if_little_endian(new Uint32Array([
    // w0-3
    0x2b7e1516, 0x28aed2a6,
    0xabf71588, 0x9cf4f3c,
    // i 4
    0xa0fafe17, 0x88542cb1,
    0x23a33939, 0x2a6c7605,

    0xf2c295f2, 0x7a96b943,
    0x5935807a, 0x7359f67f,

    0x3d80477d, 0x4716fe3e,
    0x1e237e44, 0x6d7a883b,

    0xef44a541, 0xa8525b7f,
    0xb671253b, 0xdb0bad00,

    0xd4d1c6f8, 0x7c839d87,
    0xcaf2b8bc, 0x11f915bc,

    0x6d88a37a, 0x110b3efd,
    0xdbf98641, 0xca0093fd,

    0x4e54f70e, 0x5f5fc9f3,
    0x84a64fb2, 0x4ea6dc4f,

    0xead27321, 0xb58dbad2,
    0x312bf560, 0x7f8d292f,

    0xac7766f3, 0x19fadc21,
    0x28d12941, 0x575c006e,

    0xd014f9a8, 0xc9ee2589,
    0xe13f0cc8, 0xb6630ca6
  ]));
  deepEqual(AES.key_expansion(key128), expected_expansion_key128, "128 bit");

  var key192 = [
    0x8e, 0x73, 0xb0, 0xf7, 0xda, 0x0e, 0x64, 0x52,
    0xc8, 0x10, 0xf3, 0x2b, 0x80, 0x90, 0x79, 0xe5,
    0x62, 0xf8, 0xea, 0xd2, 0x52, 0x2c, 0x6b, 0x7b
  ];
  var expected_expansion_key192 = swap_if_little_endian(new Uint32Array([
    // w0-5
    0x8e73b0f7, 0xda0e6452,
    0xc810f32b, 0x809079e5,
    0x62f8ead2, 0x522c6b7b,
    // i 6
    0xfe0c91f7, 0x2402f5a5,
    0xec12068e, 0x6c827f6b,
    0x0e7a95b9, 0x5c56fec2,

    0x4db7b4bd, 0x69b54118,
    0x85a74796, 0xe92538fd,
    0xe75fad44, 0xbb095386,

    0x485af057, 0x21efb14f,
    0xa448f6d9, 0x4d6dce24,
    0xaa326360, 0x113b30e6,

    0xa25e7ed5, 0x83b1cf9a,
    0x27f93943, 0x6a94f767,
    0xc0a69407, 0xd19da4e1,

    0xec1786eb, 0x6fa64971,
    0x485f7032, 0x22cb8755,
    0xe26d1352, 0x33f0b7b3,

    0x40beeb28, 0x2f18a259,
    0x6747d26b, 0x458c553e,
    0xa7e1466c, 0x9411f1df,

    0x821f750a, 0xad07d753,
    0xca400538, 0x8fcc5006,
    0x282d166a, 0xbc3ce7b5,

    0xe98ba06f, 0x448c773c,
    0x8ecc7204, 0x01002202
  ]));

  deepEqual(AES.key_expansion(key192), expected_expansion_key192, "192 bit");

  var key256 = [
    0x60, 0x3d, 0xeb, 0x10, 0x15, 0xca, 0x71, 0xbe,
    0x2b, 0x73, 0xae, 0xf0, 0x85, 0x7d, 0x77, 0x81,
    0x1f, 0x35, 0x2c, 0x07, 0x3b, 0x61, 0x08, 0xd7,
    0x2d, 0x98, 0x10, 0xa3, 0x09, 0x14, 0xdf, 0xf4
  ];
  var expected_expansion_key256 = swap_if_little_endian(new Uint32Array([
    // w0-7
    0x603deb10, 0x15ca71be,
    0x2b73aef0, 0x857d7781,
    0x1f352c07, 0x3b6108d7,
    0x2d9810a3, 0x0914dff4,
    // i 8
    0x9ba35411, 0x8e6925af,
    0xa51a8b5f, 0x2067fcde,
    0xa8b09c1a, 0x93d194cd,
    0xbe49846e, 0xb75d5b9a,

    0xd59aecb8, 0x5bf3c917,
    0xfee94248, 0xde8ebe96,
    0xb5a9328a, 0x2678a647,
    0x98312229, 0x2f6c79b3,

    0x812c81ad, 0xdadf48ba,
    0x24360af2, 0xfab8b464,
    0x98c5bfc9, 0xbebd198e,
    0x268c3ba7, 0x09e04214,

    0x68007bac, 0xb2df3316,
    0x96e939e4, 0x6c518d80,
    0xc814e204, 0x76a9fb8a,
    0x5025c02d, 0x59c58239,

    0xde136967, 0x6ccc5a71,
    0xfa256395, 0x9674ee15,
    0x5886ca5d, 0x2e2f31d7,
    0x7e0af1fa, 0x27cf73c3,

    0x749c47ab, 0x18501dda,
    0xe2757e4f, 0x7401905a,
    0xcafaaae3, 0xe4d59b34,
    0x9adf6ace, 0xbd10190d,

    0xfe4890d1, 0xe6188d0b,
    0x046df344, 0x706c631e
  ]));

  deepEqual(AES.key_expansion(key256), expected_expansion_key256, "256 bit");
});

test("Cipher", function() {
  function test_cipher_symmetric(input, key, expected_output) {
    // expected_output is expected encrypted output.
    // this looks weird because cipher and inv_cipher uses inout argument.
    var w = AES.key_expansion(key);
    var output_u8 = new Uint8Array(input.length);
    var output_u32 = new Uint32Array(output_u8.buffer);
    output_u8.set(input);
    var inv_output_u8 = new Uint8Array(input.length);
    var inv_output_u32 = new Uint32Array(inv_output_u8.buffer);

    AES.cipher(output_u32, w);
    inv_output_u8.set(output_u8);
    AES.inv_cipher(inv_output_u32, w);

    return (
      BufferUtils.buffer_equal(output_u8.buffer, expected_output.buffer) &&
      BufferUtils.buffer_equal(inv_output_u8.buffer, input.buffer)
      );
  }

  var input128_2 = new Uint8Array([
    0x32, 0x43, 0xf6, 0xa8, 0x88, 0x5a, 0x30, 0x8d,
    0x31, 0x31, 0x98, 0xa2, 0xe0, 0x37, 0x07, 0x34
  ]);
  var key128_2 = new Uint8Array([
    0x2b, 0x7e, 0x15, 0x16, 0x28, 0xae, 0xd2, 0xa6,
    0xab, 0xf7, 0x15, 0x88, 0x09, 0xcf, 0x4f, 0x3c
  ]);
  var output128_2 = new Uint8Array([
    0x39, 0x25, 0x84, 0x1d, 0x02, 0xdc, 0x09, 0xfb,
    0xdc, 0x11, 0x85, 0x97, 0x19, 0x6a, 0x0b, 0x32
  ]);
  ok(test_cipher_symmetric(input128_2, key128_2, output128_2), "128 bit (appendix b example)");

  var input128 = new Uint8Array([
    0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77,
    0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff,
  ]);
  var key128 = new Uint8Array([
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
  ]);
  var output128 = new Uint8Array([
    0x69, 0xc4, 0xe0, 0xd8, 0x6a, 0x7b, 0x04, 0x30,
    0xd8, 0xcd, 0xb7, 0x80, 0x70, 0xb4, 0xc5, 0x5a,
  ]);
  ok(test_cipher_symmetric(input128, key128, output128), "128 bit (appendix c test vector)");

  var input192 = new Uint8Array([
    0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77,
    0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff,
  ]);
  var key192 = new Uint8Array([
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
  ]);
  var output192 = new Uint8Array([
    0xdd, 0xa9, 0x7c, 0xa4, 0x86, 0x4c, 0xdf, 0xe0,
    0x6e, 0xaf, 0x70, 0xa0, 0xec, 0x0d, 0x71, 0x91,
  ]);
  ok(test_cipher_symmetric(input192, key192, output192), "192 bit (appendix c test vector)");

  var input256 = new Uint8Array([
    0x00, 0x11, 0x22, 0x33, 0x44, 0x55, 0x66, 0x77,
    0x88, 0x99, 0xaa, 0xbb, 0xcc, 0xdd, 0xee, 0xff,
  ]);
  var key256 = new Uint8Array([
    0x00, 0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07,
    0x08, 0x09, 0x0a, 0x0b, 0x0c, 0x0d, 0x0e, 0x0f,
    0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16, 0x17,
    0x18, 0x19, 0x1a, 0x1b, 0x1c, 0x1d, 0x1e, 0x1f,
  ]);
  var output256 = new Uint8Array([
    0x8e, 0xa2, 0xb7, 0xca, 0x51, 0x67, 0x45, 0xbf,
    0xea, 0xfc, 0x49, 0x90, 0x4b, 0x49, 0x60, 0x89,
  ]);
  ok(test_cipher_symmetric(input256, key256, output256), "256 bit (appendix c test vector)");
});

