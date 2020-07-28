---
title: 剑指offer习题学习过程51-66
date: 2019-06-19 15:02:37
tags: C++
---
## 面试题61：扑克牌中的顺子

> 题目：从扑克牌中随机抽5张牌，判断是不是一个顺子，即这5张牌是不是连续的。2~10时数字本身，A为1，J为11，Q为12，K为13，而大小王可以看出任意数字。

思路：将扑克牌的背景抽象成计算机语言，把5张牌看成由5个数字组成的数组。大小王是特殊数字，不妨定义为0。
为了判断这5个数字是不是连续的，最直观的方法是将其排序。其中由于大小王也就是0可以替换成任何一个数字，所以可以用0去补齐数组中的空缺使其连续。
所以要做的有三个步骤：

1. 将数组排序
2. 统计0的个数
3. 统计排序后数组中相邻数字之间的空缺总数。如果空缺的总数小于或者等于0的个数，那么就是连续的。（需要注意的是如果有对子，则不可能连续）

解法：

```C++
bool isContinuous(vector<int> &input)
{
    int length = input.size();
    if(length != 5)return false;
    
    sort(input.begin(),input.end());
    
    int numberOfZero = 0;
    int numberOfGap = 0;
    //计算大小王的个数
    for(int i = 0;i < length;i++)
    {
        if(input[i] == 0)
            numberOfZero ++;
    }
    for(int i = numberOfZero + 1;i < length;i++)
    {
        if(input[i] == input[i-1])
            return false;
        
        numberOfGap = input[i] - input[i-1] -1;        
    }
    return (numberOfGap>numberOfZero) ? false : true;   
}
```

## 面试题62：圆圈中最后剩下的数字

> 题目：0，1，····，n这n个数字排成一个个圆圈，从数字0开始，每次从这个圆圈里删除第m个数字。求出这个圆圈里剩下的最后一个数字。例如，0、1、2、3、4这5个数字，从数字0开始每次删除第3个数字，则删除的前4个数字依次是2、0、4、1，因此最后剩下的数字是3。

思路：本题是约瑟夫环（Josephuse）问题，有两种解题方法：一种方法用环形链表模拟圆圈的经典算法；第二种算法是分析被删除数字的规律直接计算出剩下的数字。

方法一：用list模拟环形链表，在遍历到末尾的时候把迭代器转到链表头部。

解法： 

```C++
int lastRemaining(unsigned int n,unsigned int m)
{
    if( n < 1 || m < 1)
        return -1;
    unsigned int i = 0;
    list<int> numbers;
    for(i = 0;i < n;i++)
    {
        numbers.push_back(i);
    }
    
    list<int>::iterator current = numbers.begin();
    
    while(numbers.size() > 1)
    {
        for(int i = 1;i < m;i++)
        {
            current ++;
            if(current == numbers.end())
                current = numbers.begin();
        }
        list<int>::iterator next = ++current;
        if(next == numbers.end())
            next = numbers.begin();
        current--;
        numbers.erase(current);
        current = next;
    }
    return *(current);
}
```

方法二：定义一个关于n和m的方程$f(n,m)$，表示每次在n个数字0，1，···，n-1中删除第m个数字最后剩下的数字。

$$f(n,m)=
\begin{cases}
0& \text{n=1}\\
[f(n-1,m)+m]\%n& \text{n>1}
\end{cases}$$

解法：

```C++
int lastRemaining(unsigned int n,unsigned int m)
{
    if( n < 1 || m < 1)
        return -1;
    
    int last = 0;
    for(int i = 2;i <= n;i++)
        last = (last+m)%i;
    return last;
}
```

## 面试题63：股票的最大利润

>题目：假设把某股票的价格按照时间先后顺序存储阿紫数组中，请问买卖该股票一次可能获得的最大利润是多少？例如，一只股票在某些时间节点的价格为{9,11,8,5,7,12,16,14}。如果我们能在价格为5的时候买入并在16时卖出，则能收获最大利润11。

思路：最大利润实际就是求数组中所有数对的最大差值，可以在遍历到第i个数字的时候记住前i-1个数中的最小值，就可以获得当前的最高利润了。

解法：

```C++
int maxDiff(const vector<int> &input)
{
    int length = input.size();
    if(length < 1)return -1;
    
    int min = input[0];
    int maxDiff = 0;
    
    for(int i = 1;i < length;i++)
    {
        if(input[i-1] < min)
            min = input[i-1];
        if(input[i] - min > maxDiff)
            maxDiff = input[i] - min;        
    }
    return maxDiff;
}
```

## 面试题64：求1+2+···+n

> 题目：求1+2+···+n，要求不能使用乘除法、for、while、if、else、switch、case等关键词和条件判断语句。

思路：

1. 利用构造函数来实现循环：构造函数里写循环内容，数组实例化写循环次数。
2. 利用递归实现循环，其中判断使用虚函数和数组实现来结束递归。
3. 用函数指针来模拟虚函数（在纯C环境中）。
4. 利用模版来实现递归。

2:

```C++
class A;
A *array[2];

class A
{
    public:
    virtual unsigned int sum(unsigned int n)
    {
        return 0;
    }
};

class B : public A
{
public:
	virtual unsigned int sum(unsigned int n)
	{
		return array[!!n]->sum(n-1)+n;
	}
};

int sum_Solution2(unsigned int n)
{
    A a;
    B b;
    array[0] = &a;
    array[1] = &b;
    int value = array[1]->sum(n);
    return value;
}
```



3:

```C
typedef unsigned int (*fun)(unsigned);

unsigned int solution3_Teminator(unsigned int n)
{
    return 0;
}

unsigned int sum_Solution3(unsigned int n)
{
    static fun f[2] = {solution3_Teminator,sum_Solution3};
    return n+f[!!n](n-1);
}
```

4:

```C++
template <unsigned int n>struct sum_Solution4
{
    enum value{N = sum_Solution4<n - 1>::N + n};
};
template <> struct sum_Solution4<1>
{
	enum value{ N = 1};
};
```



## 面试题65：不用加减乘除法做加法

> 题目：写一个函数，求两个整数之和，要求在函数体内不能使用四则运算符号。

思路：利用位运算，来模拟加法，分为三步。

1. 只做各位的相加不进位。
2. 做进位。
3. 将前面两个结果相加。

解法：

```C++
int add(int num1,int num2)
{
    int sum,carry;
    do
    {
        sum = num1 ^ num2;
        carry = (num1 & num2)<<1;
        num1 = sum;
        num2 = carry;     
    }
    //num2用来存储进位，并不断相加
    while(num2 != 0);
    return num1;
}
```

## 面试题66：构建乘积数组

> 题目：给定一个数组$A[0,1,...,n-1]$，请构建一个数组$B[0,1,...,n-1]$，其中B的元素$B[i]=A[0]*A[1]*...*A[i-1]*A[i+1]*...*A[n-1]$。不能使用除法。

思路：如果可以使用除法，就可以用数组所有数的乘积除以当前数（注意0的情况）。

定义$C[i]=A[0]*A[1]*...*A[i-1]，D[i]=A[i+1]*...*A[n-2]*A[n-1]$。

这两个数组可以用自上而下和自下而上的顺序计算出来。然后B数组就出来了。

解法：

```C++
bool multiply(const vector<double> &input,vector<double> &output)
{
    int length = input.size();
    if(length < 1)return -1;
    output.resize(length,1);
    
    //tmpC存储的是C数组
    vector<double> tmpC(length,1);
    for(int i = 1;i < length;i++)
    {
        tmpC[i] = tmpC[i-1]*input[i-1];
    }
    //tmpD存储的是D数组
    vector<double> tmpD(length,1);
	for(int i = length-2;i >= 0;i--)
    {
        tmpD[i] = tmpD[i+1]*input[i+1];
    }
    for(int i = length-1;i >= 0;i--)
    {
        output[i]=tmpD[i]*tmpC[i];
    }
}
```



