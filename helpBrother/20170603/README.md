图3 长度分布图
4.2中文分词基于支持向量机的应用
示例样句：“我要考研了”
1.特征设计
	V1	V2	V3	V4	V5	Y
W	0	1	-12	23	-3	-1
O1	1	2	-11	15	-11	1
Y	0	3	-10	25	-1	-1
A1	1	4	-9	1	-24	-1
O2	1	5	-8	15	-11	1
K	0	6	-7	11	-15	-1
A2	1	7	-6	1	-24	-1
O3	1	8	-5	15	-11	-1
Y	0	9	-4	25	-1	-1
A3	1	10	-3	1	-24	-1
N3	0	11	-2	14	-12	1
L	0	12	-1	12	-14	-1
E	1	13	0	3	-23	1

其中，各个属性的解释如下：
V1	是否是声母：0代表不是，1代表是
V2	该字母在句中的顺序位置
V3	该字母在句中的逆序位置
V4	该字母在字母表中的顺序位置
V5	该字母在字母表中的逆序位置
Y	是否是分词：-1代表不是，1代表是