package com.syh.officeboot.zjrcu.filter;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Scanner;

public class Probability {
    public static void main(String[] args) {
        System.out.println("抽卡开始");
        int count = 0;
        int result = 10;
        Scanner scanner = new Scanner(System.in);
        long begin = System.currentTimeMillis();
        while(result != 0){
            //scanner.nextLine();
            try {
                Thread.sleep(5000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            double ram = Math.random();
            List<Double> prize = new ArrayList<>();
            prize.add(0.02);
            prize.add(0.22);
            prize.add(1.0);
            prize.add(ram);
            Collections.sort(prize);
            count++;
            if (0==prize.indexOf(ram)){
                System.out.println("恭喜你抽中SSR");
                result = 0;
            }else if (1==prize.indexOf(ram)){
                System.out.println("你抽中了SR");
            }else if (2==prize.indexOf(ram)){
                System.out.println("只是个R");
            }
        }
        System.out.println("耗时"+(System.currentTimeMillis() - begin));
    System.out.println("一共抽了"+count+"次");

    }
}
