package com.syh.officeboot.zjrcu.filter;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

/**
 * 菜单码梳理
 */
public class Test {
    public static void main(String[] args) throws Exception {
        FileReader fileReader = new FileReader("C:\\Users\\syh\\Desktop\\BTOP_TELLER_MENUTREE.del");
        BufferedReader br = new BufferedReader(fileReader);
        PrintWriter pw = new PrintWriter("C:\\Users\\syh\\Desktop\\MENUTREE.txt");
        String line;
        List G1 = new ArrayList();
        List temp = new ArrayList();
        List one = new ArrayList();
        List two = new ArrayList();
        List three = new ArrayList();
        List four = new ArrayList();
        while((line = br.readLine()) != null){
            line = line.replace("\"","");
            String[] data = line.split(",",-1);
            if ("G3".equals(data[7])){
                G1.add(data);
            }else{
                temp.add(data);
            }
        }
        br.close();
        fileReader.close();
        for (int g1=0;g1<G1.size();g1++){
            String[] ones = (String[]) G1.get(g1);//一级
            for (int i=0;i<temp.size();i++){
                String[] data = (String[]) temp.get(i);
                if (ones[0].equals(data[7])){
                    one.add(data);//二级
                }
            }
        }
        for (int g1x=0;g1x<one.size();g1x++){
            String[] twos = (String[]) one.get(g1x);
            for (int j=0;j<temp.size();j++){
                String[] data = (String[]) temp.get(j);
                if (twos[0].equals(data[7])){
                    two.add(data); //三级
                }
            }
        }
        for (int g1xx=0;g1xx<two.size();g1xx++){
            String[] threes = (String[]) two.get(g1xx);
            for (int j=0;j<temp.size();j++){
                String[] data = (String[]) temp.get(j);
                if (threes[0].equals(data[7])){
                    three.add(data); //四级
                }
            }
        }
        for (int g1xxx=0;g1xxx<three.size();g1xxx++){
            String[] fours = (String[]) three.get(g1xxx);
            for (int j=0;j<temp.size();j++){
                String[] data = (String[]) temp.get(j);
                if (fours[0].equals(data[7])){
                    four.add(data); //四级
                }
            }
        }
    for(int index=0;index<G1.size();index++){
        String[] data = (String[]) G1.get(index);
        pw.print(data[3]+"-"+data[1]+"\n");
        for (int index1=0;index1<one.size();index1++){
            String[] data1 = (String[]) one.get(index1);
            if (data[0].equals(data1[7]) && data1[6].equals("F")){
                pw.print("\t"+data1[3]+"-"+data1[1]+"\n");
                for (int index2=0;index2<two.size();index2++){
                    String[] data2 = (String[]) two.get(index2);
                    if(data1[0].equals(data2[7])&& data2[6].equals("F")){
                        pw.print("\t\t"+data2[3]+"-"+data2[1]+"\n");
                        for (int index3=0;index3<three.size();index3++){
                            String[] data3 = (String[]) three.get(index3);
                            if(data2[0].equals(data3[7])&& data3[6].equals("F")){
                                pw.print("\t\t\t"+data3[3]+"-"+data3[1]+"\n");
                            }else if(data2[0].equals(data3[7])&& data3[6].equals("L")){
                                pw.print("\t\t\t"+data3[3]+"-"+data3[1]+"\n");
                            }
                        }
                    }else if(data1[0].equals(data2[7])&& data2[6].equals("L")){
                        pw.print("\t\t"+data2[3]+"-"+data2[1]+"\n");
                    }
                }
            }else if(data[0].equals(data1[7])&& data1[6].equals("L")){
                pw.print("\t"+data1[3]+"-"+data1[1]+"\n");
            }
        }
    }
    pw.close();
    }
}
