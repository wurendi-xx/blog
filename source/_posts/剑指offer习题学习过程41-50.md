---
title: 剑指offer习题学习过程41-50
date: 2019-06-19 15:02:08
tags: C++
---
## 面试题41：数据流中的中位数

> 题目：如何得到一个数据流中的中位数？如果从数据流中读出奇数个数值，那么中位数就是所有数值排序之后位于中间的数值。如果从数据流中读出偶数个数值，那么中位数就是所有数值排序之后中间两个数的平均值。

要点：数组里，如果是没有排序的数组，则插入一个数的视觉复杂度是O(1)，找出中位数的时间复杂度是O(n)。
排序的数组里，插入的时间复杂度是O(n)，找出中位数的时间复杂度是O(1)。

二叉搜索树里，插入数据时间复杂度是O(logn)，为了得到中位数，需要在二叉树节点添加一个表示子树节点数目的字段，就可以在O(logn)时间内得到中位数。

为了避免二叉搜索树中最差的情况，可以用平衡搜索二叉树，即AVL树，将原来代表左右子树高度差的平衡因子改为数目之差，中位数获取时间变为O(1)。

| 数据结构       | 插入的时间复杂度      | 得到中位数的时间复杂度 |
| -------------- | --------------------- | ---------------------- |
| 没有排序的数组 | O(1)                  | O(n)                   |
| 排序的数组     | O(n)                  | O(1)                   |
| 排序的链表     | O(n)                  | O(1)                   |
| 二叉搜索树     | 平均O(logn)，最差O(n) | 平均O(logn)，最差O(n)  |
| AVL数          | O(logn)               | O(1)                   |
| 最大堆和最小堆 | O(logn)               | O(1)                   |

用一个最大堆来放置左边数据，最小堆放置右边数据，为了使得两个堆的总数差不超过1，利用奇偶来分配不同的堆。插入时，如果一个新的数比最大堆的堆顶小，则将新的数据插入最大堆，再将最大堆的最大数插入最小堆。用STL中的push_heap,pop_heap以及vector实现堆。仿函数less,greater实现最大堆和最小堆。

```C++
template<typename T> class dynamicArray
{
    public:
    void insert(T num)
    {
        //偶数个数
        if( (min.size()+max.size()) & 1 == 0) 
        {
            //插入最大堆，比堆顶小
            if(max.size() > 0 && num < max[0])
            {
                max.push_back(num);
                push_heap(max.begin(),max.end(),less<T>());
                
                num = max[0];
                //将堆顶和最后一个数对调
                pop_heap(max.begin(),max.end(),less<T>());
                //弹出刚才对调的堆顶
                max.pop_back;
            }
            min.push_back(num);
            push_heap(min.begin(),min.end(),greater<T>());
        }
        else
        {
            //奇数插入，比最小堆堆顶大
            if(min.size() > 0 && min[0] < num)
            {
                min.push_back(num);
                push_heap(min.begin(),min.end(),greater<T>());
                
                num = min[0];
                
                pop_heap(min.begin(),min.end(),greater<T>());
                min.pop_back();
            }
            
            max.push_back(num);
            push_heap(max.begin(),max.end(),less<T>());
        }
    }
    
    T getMedian()
    {
        int size = min.size() + max.size();
        if(size == 0)
            throw exception("no value");
        T median;
        //奇数
        if((size&1) == 1)
            //由于奇数插入最小堆，所以最小堆数目多1
            median = min[0];
        else
            median = (max[0]+min[0])/2;
        
        return median;
    }
    private:
    vector<T> min;
    vector<T> max;
        
};
```

利用insert插入从数据流读到的数据，getMedian取得已获得数据的中位数。

## 面试题42：连续子数组的最大和

> 题目：输入一个整形数组，数组里有正数也有负数。数组中一个或者多个连续整数组成一个子数组。求所有子数组的和的最大值。要求时间复杂度为O(n)。

思路：动态规划，$f(i) = max(pData[i] , f(i-1)+pData[i])$。

解法：

```C++
int getMaxSum(vector<int>& input)
{
    int length = input.size();
    vector<int> dp;
    for(int i = 0;i < length;i++)
    {
        if(dp.size() == 0 || dp(i - 1) <= 0)
        {
            dp.push_back(input(i));
        }
        else if(dp(i - 1) > 0)
        {
            int tmp = dp[i] > (f(i) + dp[i-1])? dp[i] : f(i) + dp[i-1];
            dp.push_back(tmp);
        }
    }
    return dp[length - 1];
}
```

## 面试题43：1~n整数中出现1的次数

> 题目：输入一个整数，求1~n这n个整数十进制表示中出现1的次数。

思路：比如计算1~21345中所有出现1的次数。把其分为两段，一段是1~1345，一段是1346~21345。
先分析1346~21345，1的出现分为两种情况。
1. 首先分析1出现在最高位的情况。在1346~21345中，1出现在10000~19999这10000个数字的万位，一共出现了10000次即$10^4$。对于一般情况，最高位是1的时候，次数不是$10^4$，而是除去最高位后剩下的数字再加1（1345+1）。

2. 再分析1出现在除最高位之外的情况。1346~21345这20000个数字中后4位中1出现的次数是8000次。由于最高位是2，可以再把1346~21345分为两段：1346~11345和11346~21345。每一段剩下的4位数字中，选择其中一位是1，其余三位可以是0~9，根据排列组合，总共出现次数是$2x4x10^3=8000$次。
    再分析1~1345，就可以用递归求得。

  这种解法的思路是每次去掉最高为进行递归，递归次数和位数相同，一个数字n有O(logn)位，所以这种思路的时间复杂度是O(logn)。

  解法：
```C++
int NumberOf1Between1AndN(int n)
{
	if(n<=0)
		return 0;
	char strN[50];
	sprintf(strN,"%d",n);//转化为字符串便于编程。
	return NumberOf1(strN);
}

int NumberOf1(const char* strN)
{
    if(!strN || *strN < '0' || *strN > '9' || *strN == '\0')
        return 0;
    
    int first = *strN - '0';
    unsigned int length = static_cast<unsigned int>(strlen(strN));
    //判断个位数的情况
    if(length == 1 && first ==0)
        return 0;
    
    if(length ==1 && first >0)
        return 1;
    
    //假设strN是“21345”
    int numFirstDigit=0;
    if(first > 1)
        numFirstDigit = powerBase10(length - 1);
    else if(first == 1)
        numFirstDigit = atoi(strN+1)+1;
    //numOtherDigits是1346~21345除第一位之外的1的数目
    int numOtherDigits = first*(length - 1)*powerBase10(length - 2);
    //numRecursive是1~1345中的数目，也是递归的入口
    int numRecursive = NumberOf1(strN+1);
    
    return numFirstDigit+numOtherDigits+numRecursive;
   
}
int powerBase10(unsigned int n)
{
    int result = 1;
    for(unsigned int i =0;i<n;i++)
    {
        result*=10;
    }
    return result;
}
```

## 面试题44：数字序列中某一位的数字

> 题目：数字以01234567891011121314···的格式序列化到字符序列中。再这个序列中，第5为（从0开始计数）是5，低13为是1，第19为是4。写出一个函数，求任意第n为对应的数字。

思路：一位数字有0~9一共10个二位数字有10~99一共180个，三位数字有100~999一共2700个，以此为区别寻找。比如811位，大于180，所以属于三位数字，$811=270*3+1$，这意味着811位是从100开始的第270个数字即370的中间一位，即7。

解法：

```C++
int beginNumber(int digits);
int digitAtIndex(int index,int digits);
int countOfIntegers(int digits);
int digitAtIndex(int index);

int digitAtIndex(int index)
{
    if(index < 0)
        return -1;
    int digits = 1;//代表几位数字
    while(true)
    {
        int numbers = countOfIntegers(digits);//用来计算几位多少个数字的
        if(index < numbers*digits)
            return digitAtIndex(index,digits);
        index-=digits*numbers;
        digits++;
    }
    return -1;
}
//计算m位一共有多少个，比如1：10，2：90，3：900
int countOfIntegers(int digits)
{
    if(digits == 1)
        return 10;
    int count = (int)pow(10,digits-1);
    return 9*count;
}
//知道位数和序列后，就可以好到那个数字
int digitAtIndex(int index,int digits)
{
    // 811 = 270*3+1，number = 270+100
    int number = beginNumber(digits)+index/digits;
    //从右数第几位，
    int indexFromRight = digits - index%digits;
    for(int i = 1;i < indexFromRight;i++)
    {
        number/=10;
    }
    return number%10;
}
//得到m位数的第一个数字
int beginNumber(int digits)
{
    if(digits == 1)
        return 0;
    return (int)pow(10,digits-1);
}
```

## 面试题45：把数组排成最小的数

> 题目：输入一个正整数数组，把数组里所有数字拼接起来排成一个数，打印能拼接出所有数字中最小的一个。例如输入数组：{3，32，321}，则这三个数字能拼成的最小数字是321323。

思路：自定义一个新的对比规则：有两个数m和n，能拼接成mn和nm，如果mn<nm，则m小于n，如果nm<mn则n小于m，如果mn=nm则m等于n。

拼接数字可能溢出，需要用字符串解决大数问题。

解法：

```C++
bool compare(string strNumber1,string strNumber2);

void printMinNumber(vector<int> numbers)
{
    int length = numbers.size();
    if(length < 1)
        return;
    vector<string> strNumbers;
    for(auto tmp : numbers)
    {
        strNumbers.push_back(to_string(tmp));
    }
    sort(strNumbers.begin(),strNumbers.end(),compare);
    
    for(auto tmp : strNumbers)
    {
        cout<<tmp;
    }
    cout<<endl;
}

bool compare(string strNumber1,string strNumber2)
{
    string strCombine1 = strNumber1 + strNumber2;
    string strCombine2 = strNumber2 + strNumber1;
    return strCombine1.compare(strCombine2);
}

int main()
{
	vector<int> target = {3,32,321};
	printMinNumber(target);
}
```

一个有效的比较规则需要三个条件：自反性，对称性和传递性。

## 面试题46：把数字翻译成字符串

> 题目:给定一个数字，我们按照如下规则把它翻译为字符串：0翻译成“a”，1翻译成“b“，···11翻译成”l“，···25翻译成”z”。一个数字可能有多个翻译。例如，12258有5种翻译：“bccfi”,“bwfi”,“bczi”,“mcfi”,“mzi”。实现 一个函数，用来计算一个数字有多少种不是同的翻译方法。

思路：递归从最大的问题开始自上而下解决问题会产生重复。所以这里从最小的子问题开始自下而上解决问题，这样可以消除重复的子问题。从数字的末尾开始，然后从右到左翻译并计算不同翻译的数目。

```C++
int getTranslationCount(int number)
{
    if(number < 0)
        return 0;
    
    string numberInString = to_string(number);
    return getTranslationCount(numberInString);   
}
int getTranslationCount(const string& number)
{
    int length = number.size();
    int *counts = new int[length];
    int count = 0;
    
    for(int i = length - 1;i >= 0;i--)
    {
        count = 0;
		//如果是第一次则初始化，不是第一次则继承上一次count的总数
        if(i < length - 1)
            count = counts[i+1];
        else
            count = 1;
        
        if(i < length - 1)
        {
            int digit1 = number[i] -'0';
            int digit2 = number[i+1] -'0';
            int converted = digit1*10+digit2;
            //可能是两位的字母
            if(converted >= 10 && converted <= 25)
            {
                if(i < length - 2)
                    count += counts[i+2];
                else
                    count += 1;
            }
        }
        counts[i] = count;
    }
    count = counts[0];
    delete[] counts;
    
    return count;
}
```

## 面试题47：礼物的最大价值

> 题目：再一个m*n的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（大于0）。从期盼的左上角开始拿礼物，并每次向左或者向下移动一格，直到到达期盼的右下角。给定一个棋盘，计算出最多能拿到多少价值的礼物。

思路：用动态规划解决问题，定义一个函数$f(i,j)$表示到达坐标为$(i,j)$的格子时能拿到的礼物总和的最大值。我们有两种可能的途径达到坐标为$(i,j)$的格子；通过格子$(i-1,j)$或者$(i,j-1)$。所以：
$$f(i,j)=max(f(i-1,j),f(i,j-1))+gift[i,j]$$

解法：

```C++
int getMaxValue(vector<vector<int>>& values)
{
    int rows = values.size();
    if(rows<1)return -1;
    int cols = values[0].size();
    if(cols<1)return -1;
    
    vector<vector<int>> dp(cols,vector<int>(rows));
    

    for(int i = 0;i < rows;i++)
    {
        for(int j = 0;j < cols;j++)
        {
            int left = 0;
            int up = 0;
            
            if(i > 0)
                up = dp[i-1][j];
            if(j > 0)
                left = dp[i][j-1];
            
            dp[i][j] = max(left,up)+values[i][j];
        }
    }
    
    int maxValues = dp[rows-1][cols-1];
    
    return maxValues;
}
```

## 面试题48：最长不含重复字符的子字符串

> 题目：请从字符串中找出一个最长的不包含重复字符的子字符串，计算该最长子字符串的长度。假设字符串中只包含'a'~'z'的字符。例如在字符串“arabcacfr”中，最长的不包含重复字符的子字符串时"acfr"，长度为4。

思路：暴力算法需要在$O(n^2)$的子字符串中用$O(n)$的时间判断是否重复，这种算法的时间复杂度时$O(n^3)$。

用动态规划来提高效率，定义函数$f(i)$表示以第$i$个字符为结尾的不包含重复字符的子字符串的最长长度，
如果字符没有出现过，那么$f(i)=f(i-1)+1$。
如果字符出现过，先计算字符和上次出现位置的距离，记为d。
1. $d小于等于f(i-1),f(i)=d$。
2. $d大于f(i-1),f(i)=f(i-1)+1$。

解法：

```C++
int longestSubstringWithoutDuplication(const string& str)
{
    int curLength = 0;//f(i-1)
    int maxLength = 0;//f(i)
    
    int length = str.size();
    vector<int> dp(26,-1);//用来存储26个字母所在地位置
    
    for(int i = 0;i < length;i++)
    {
        int preIndex = dp[str[i]-'a'];
        if((i - preIndex)> curLength || preIndex == -1)
            curLength++;
        else
        {
            curLength = i - preIndex;
        }
        dp[str[i]-'a'] = i;
        if(curLength>maxLength)
            maxLength = curLength;         
    }
	return maxLength;   
}
```

## 面试题49：丑数

> 题目：将只包含因子2，3和5地数称作为丑数。求出从小到大地第1500个丑数。习惯上把1当作第一个丑数。

思路：暴力解法是将目标数对2，3，5连续整除，如果最后得到1，就是丑数。时间复杂度较高。

创建数组保存已经找到的丑数，用空间换时间的解法。
问题是如何获得下一个丑数，假设已经存在一个丑数数组，其最大的丑数为M。下一个大于M的丑数一定是数组中的数乘以2，3或5生成，记为M2，M3，M5（遍历所有数乘以2，3，5之后第一个大于M的数）。下一个丑数就是这三个数中的最小数。

解法：

```C++
int getUglyNumber(int index)
{
    if(index < 1)return 0;
    vector<int> uglyNumbers(index);
    uglyNumbers[0]=1;
    int nextUglyIndex = 1;
    
    auto M2 = uglyNumbers.begin();
    auto M3 = uglyNumbers.begin();
    auto M5 = uglyNumbers.begin();
    
    while(nextUglyIndex < index)
    {
        int min = Min(*M2*2,*M3*3,*M5*5);
        uglyNumbers[nextUglyIndex] = min;
        
        while(*M2*2 <= uglyNumbers[nextUglyIndex])
            M2++;
        while(*M3*3 <= uglyNumbers[nextUglyIndex])
            M3++;        
        while(*M5*5 <= uglyNumbers[nextUglyIndex])
            M5++;
        nextUglyIndex++;
    }
	for(auto tmp:uglyNumbers)cout<<' '<<tmp;
		
    return uglyNumbers.back();    
}

int Min(int number1,int number2,int number3)
{
    int min = (number1<number2)?number1:number2;
    min = (min<number3)?min:number3;
    return min;
}
```

## 面试题50：第一个只出现一次的字符

> 题目一：字符串中第一个只出现一次的字符。例如：在“abaccdeff”中，输出b。

思路：暴力解法，时间复杂度为$O(n^2)$。

用哈希表的思路来做，键值(key)是字符，值(value)是字符出现的次数。

解法：

```C++
char firstNotRepeatingChar(const string& input)
{
    int length = input.size();
    if(length<1)return '\0';
    vector<int> hashMap(256,0);
    for(int i = 0;i < length;i++)
    {
        hashMap[input[i]]++;
    }
    for(int i = 0;i < length;i++)
    {
        if((hashMap[input[i]])==1)
            return input[i];
    }
    return '\0';  
}
```

> 题目二：字符流中第一个只出现一次的字符。例如，当字符流只读出前两个字符"go"的时候，第一个出现的字符是'g'，当字符流读出前6个字符“google”时，第一个只出现一次的字符是'l'。

思路：与题一对比不同的地方在于需要快速地给出字符，不能重新遍历寻找字符。改变在于将值（value）改为字符第一次出现所在的索引，重复出现改为'-2'加以区分，就可以从最小的索引中取出（key）键值即为字符。这样做就可以不用更新之前的值，在数据流长度大于256后，复杂度降低。

解法：

```C++
class charStatistics
{
public:
    charStatistics():index(0)
    {
        for(int i = 0; i <256;i++)
            hashMap[i] = -1;
    }
    void insert(char ch)//用insert模拟字符串流
    {
        if(hashMap[ch] == -1)
            hashMap[ch] = index;
        else if (hashMap[ch] >= 0)
            hashMap[ch] = -2;
        index++;
    }
    char firstAppearing()
    {
        char ch = '\0';
        int minIndex = 0;
        for(int i = 0;i < 256;i++)
        {
            if(hashMap[i] >=0 && hashMap[i] < minIndex)
            {
                ch = char(i);
                minIndex = hashMap[i];
            }            
        }
        return ch;
    }
    
private: 
    int hashMap[256];
    int index;
};
```

