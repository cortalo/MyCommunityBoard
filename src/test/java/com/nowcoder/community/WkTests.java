package com.nowcoder.community;

import java.io.IOException;

public class WkTests {

    public static void main(String[] args) {
        String cmd = "c:/work/wkhtmltopdf/bin/wkhtmltoimage https://www.google.com c:/work/data/wk-images/6.png";
        try {
            Runtime.getRuntime().exec(cmd);
            System.out.println("ok.");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
