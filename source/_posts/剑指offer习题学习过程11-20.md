---
title: 剑指offer习题学习过程11-20
date: 2019-06-19 15:01:24
tags: C++
---
## 面试题11：旋转数组的最小数字（查找和排序）

> 题目：把一个数组最开始的若干个元素搬到数组的末尾，我们称之为数组的旋转。输入一个递增排序的数组的一个旋转，输出旋转数组的最小元素。例如{3,4,5,1,2}是{1,2,3,4,5}的一个旋转，该数组的最小值为1。

思路：和二分查找一样，用一个指针指向前面递增数组的元素，第二个指针指向后面递增数组的元素，依据旋转数组的特性，第一指针的值应该大于第二指针。不断寻找，当第一指针指向前面数组的最后一个元素时，第二指针会指向后面数组的第一个元素即最小的元素。

需要注意的特殊情况：

1. 数组为空
2. 数组并没有旋转
3. 数组中有重复数字

解法：

```C++
int getMinValue(vector<int> input){
    int length = input.size();
    int left = 0;
    int right = length - 1;
    if(length == 0)return 0;
    if(length == 1 || input[0] < input[length-1])return input[0];
    while(left < right-1){
        int mid = (left+right)/2;
        if((input[left] == input[mid]) && (input[right] == input[mid]))
            return minOrdered(input);
        else if(input[right] >= input[mid]){
            right = mid;
        }
        else if(input[right] <= input[mid]){
            left = mid;
        }
    }
    return input[right];
}
int minOrdered(vector<int> input){
    int tmp = input[0];
    for(auto a : input){
        if(a < tmp)
            tmp = a;
    }
    return tmp;
}
```

## 面试题12：矩形中的路径（回溯）

> 题目：设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一格开始，每一步可以在矩阵中左、右、上、下移动一个。如果一条路径经过了矩阵的某一格，那么改路径不能再次进入该格子。例如，在下面3x4的矩阵中包含一条字符串“bfce”的路径。但矩阵中不包含字符串“abfb”的路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入这个格子。
>
> | a    | b    | t    | g    |
> | ---- | ---- | ---- | ---- |
> | c    | f    | c    | s    |
> | j    | d    | e    | h    |

思路：回溯法。利用递归的特性，路径可以看成一个栈，同时由于路径不能重复进入一个矩阵的格子，所以需要定义和字符矩阵一样大小的布尔矩阵。

解法：

```C++
#include <iostream>
#include <vector>
#include <string>


using namespace std;
//row、col代表现在所在的位置，index代表现在选择的字符，map用于存储是否重复
bool hashPathCore(vector<vector<char>> input,int row,int col,string target,int index,vector<vector<int>> map)
{
    int rows = input.size();
    int cols = input[0].size();
    int length = target.size();
    //递归结束条件，成功找到所有字符
    if(index == length - 1)return true;
    //失败条件
    if(row < 0 || col < 0 || row >= rows || col >= cols || map[row][col] )
        return false;
    //单个字符遍历
    bool resu;
    if(input[row][col] == target[index]){
        map[row][col] = 1;
        index++;
        //上下左右的寻找
        resu = hashPathCore(input,row+1,col,target,index,map)
            || hashPathCore(input,row,col+1,target,index,map)
            || hashPathCore(input,row-1,col,target,index,map)
            || hashPathCore(input,row,col-1,target,index,map);
        if(resu == false){
            map[row][col] = 0;
            index--;
        }
        return resu;
    }
  
}

bool hashPath(vector<vector<char>> input,string target)
{
    int rows = input.size();
    int cols = input[0].size();
    int length = target.size();
    vector<vector<int>> map(rows,vector<int> (cols));
    //寻找开头的起点
    for(int i = 0;i < rows;i++){
        for(int j = 0;i < cols;j++){
            if(hashPathCore(input,i,j,target,0,map))return true;
        }
    }
    return false;
}


               
int main()                          
{                                   
    vector<vector<char>> test = {{'a','b','c','d'},{'e','f','g','h'},{'i','j','e','k'}};
    string str = "abfge";              
    bool resu = hashPath(test,str);
	
	cout<<test.size()<<' '<<test[0].size()<<endl;
    for(int i = 0;i < test.size();i++){
        cout<<endl;
        for(int j = 0;j < test[0].size();j++){
            cout<<test[i][j]<<' ';
        }
    }
	cout<<endl<<resu;
    
    return 0;                       
}

               
```

## 面试题13：机器人的运动范围（回溯）

> 题目：地上有一个m行n列的方格。一个机器人从坐标(0,0)的格子开始移动，它每次可以向左、右、上、下移动一格，但不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格(35,37)，因为3+5+3+7=18 <= 18，但不能进入(35,38)。请问该机器人能够达到多少格子。

思路：同样是回溯法，与12题相比区别的地方是判断条件和不需要对标记map进行清零。

解法：

```C++
#include <iostream>
#include <vector>
#include <string>


using namespace std;
//获取位数之和
int digitSum(int target){
    int result = 0;
    while(target){
        result += target%10;
        target /= 10;
    }
    return result;
}

//row、col代表现在所在的位置，index代表现在选择的字符，map用于存储是否重复
int hashPathCore(int threshold,int row,int col,int rows,int cols,vector<vector<int>> &map)
{
	int count = 0;
    //能够进入条件
    if(row >= 0 && col >= 0 && row < rows && col < cols && !map[row][col] && threshold >= (digitSum(row) + digitSum(col)))
    {
    map[row][col] = 1;
    //上下左右的寻找
    count = 1 + hashPathCore(threshold,row+1,col,rows,cols,map)
        + hashPathCore(threshold,row,col+1,rows,cols,map)
        + hashPathCore(threshold,row-1,col,rows,cols,map)
        + hashPathCore(threshold,row,col-1,rows,cols,map);
	}
return count;
}

int hashPath(int threshold,int rows,int cols,vector<vector<int>> &map)
{

    vector<vector<int>> map1(rows,vector<int> (cols));
    //从(0,0)开始遍历
    int result = hashPathCore(threshold,0,0,rows,cols,map1);
	copy(map1.begin(),map1.end(),map.begin());
    return result;
}


               
int main()                          
{                                   
    int rows = 50;
    int cols = 50;
    int threshold = 14;  
	vector<vector<int>> map(rows,vector<int> (cols));
	int resu = hashPath(threshold,rows,cols,map);
	cout<<"rows:"<<rows<<' '<<"cols:"<<cols<<"threshold:"<<threshold<<endl;
	cout<<"result:"<<resu<<endl;
    for(int i = 0;i < rows;i++){
        cout<<endl;
        for(int j = 0;j < cols;j++){
            cout<<map[i][j]<<' ';
        }
    }
    
    return 0;                       
}             
```

## 面试题14：剪绳子（动态，贪婪）

> 题目：给你一根长度为n的绳子，请把绳子剪成m段，每段绳子的长度记为k[0],k[1],k[2]...。请问k[0]xk[1]xk[2]....k[m]可能的最大乘积是多少？例如，当绳子的长度是8时，我们把它剪成长度分别为2，3，3的三段，此时得到的最大乘积是18.

思路1：动态规划dp，空间复杂度O(n^2)，空间复杂度O(n)。

思路2：贪婪算法，空间复杂度O(1)，空间复杂度O(1)。

解法1：定义f(n)为把长度为n的绳子剪成若干段后各段长度乘积的最大值。f(n) = max(f(i)xf(n-i))

1. 确定边界值f(0),f(1),f(2),f(3)
2. 避免重复计算子问题，从小到大开始算

```C++
#include <iostream>
#include <vector>
#include <string>
using namespace std;
int maxProduct(int length){
    if(length < 2)
        return 0;
    if(length == 2)
        return 1;
    if(length ==3)
        return 2;
    //前面因为必须要剪一刀，所以f(3)=2。而之后必然会剪一刀，其局部最大值等于本身即可。
    vector<int> product = {0,1,2,3};
    for(int i = 4;i <= length;i++){
        int max = 0;
        //因为对称的关系，所以只用计算下半段即可
        for(int j = 1;j < i/2;j++){
            int tmp = product[i - j] * product[j];
            max = tmp > max ? tmp : max;
        }
        product.push_back(max);
    }
    return product[length];    
}

int main(){
	int length = 8;
	int result = maxProduct(length);
	cout<<"result: "<<result<<endl;
}
	
```

解法2：贪婪算法

1. 当n >= 5时，尽可能剪长度为3的绳子
2. 当剩余长度为4时，剪成两段长度为2的绳子

```C++
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <math.h>
using namespace std;
int maxProduct(int length){
    if(length < 2)
        return 0;
    if(length == 2)
        return 1;
    if(length ==3)
        return 2;
    if(length ==4)
        return 4;
    int result = 0;
	int count3 = length/3;
    if(length%3 == 1)
        result = pow(3,count3-1)*4;
    result = pow(3,count3)*2;
    return result;
}

int main(){
	int length = 8;
	int result = maxProduct(length);
	cout<<"result: "<<result<<endl;
}
	
```

## 面试题15：二进制中1的个数（位运算）

> 实现一个函数，输入一个整数，输出该数二进制表示中1的个数。例如9的二进制是1001，则输出2。

思路：

1. 判断最后一位，然后右移。
2. 用flag不断左移判断，避免负数导致的死循环。
3. 一个整数n，n-1和n做并运算会把最右边的1变为0。

解法：

```C++
//如果输入的是负数会引起死循环
int countBit(int input){
    int result = 0;
    while(input){
    	if(input & 1)
        	result++;
        input = input >> 1;             
    }
    return result;
}
//改良方案,训练次数为int的位数即32。
int countBit(int input){
    int result = 0;
    unsigned int flag = 1;
    while(flag){
    	if(input & 1)
        	result++;
        flag = flag << 1;             
    }
    return result;
}
//一个整数n，n-1和n做并运算会把最右边的1变为0。假设1100与1011做与运算，结果是1000。
int countBit(int input){
    int result = 0;
    while(input){
        	result++;
        input = (input-1) & input; 
    }
    return result;
}
```

## 面试题16：数值的整数次方（代码规范）

错误处理的集中方式：

|          | 优点                                             | 缺点                             |
| -------- | ------------------------------------------------ | -------------------------------- |
| 返回值   | 和系统API一致                                    | 不能方便地使用计算结果           |
| 全局变量 | 能够方便地使用计算结果                           | 用户可能会忘记检查全局变量       |
| 异常     | 可以为不同的出错原因定义不同的异常类型，逻辑清晰 | 有些语言不支持异常，对性能有影响 |



>题目：实现函数doublePower(double base,int exponent)，求base的exponent次方。不得使用库函数，同时考虑大数问题。

1. 注意检查输入，并且知道该如何输出此异常（因为0也是答案，所以要考虑其他方案比如全局变量）。
2. 快速幂的计算。
3. 结果的溢出（没有考虑）。

```C++
//没有考虑指数为负的情况
double power(double base,int exponent){
    if(exponent == 0)return 1;
    if(exponent == 1)return base;
    
    double result = 1;
    while(exponent){
        if(exponent & 1)
        	result *=base;
        base *=base;
        exponent = exponent >>1;
    }
    return result;
}
```

## 面试题17：打印从1到最大的n位数(大数问题)

> 题目：输入数字n，按顺序打印出从1到最大的n位十进制数。比如输入3，则打印出1、2、3一直到最大的3位数999。

1. 注意大数问题，只要n稍微一大就会超出long long的限制，可以使用字符串实现超高位数的打印。

```C++
#include <iostream>
#include <vector>
#include <string>
#include <stdio.h>
#include<string.h>


using namespace std;
//模拟十进制递增
bool Increment(char *number){
    int length = strlen(number);
    //记录进位
    int carry = 0;
    for(int i = length-1;i >= 0;i--){
        int nSum = number[i] - '0' + carry;
        if(i == length-1)
            nSum ++;
        if(nSum >= 10){
            //最高位进位即溢出
            if(i == 0)
                return true;
            else{
                nSum -= 10;
                carry = 1;
                number[i] = nSum +'0';
            }
        }
        else{
            number[i] = nSum +'0';
            break;
        }
    }
    return false;
}
//打印字符串（从非零开始打印）
void printNumber(char* number){
    //用来记录非零打印的开始
    bool start = 0;
    int length = strlen(number);
    for(int i = 0;i < length;i ++){
        if(!start && number[i] != '0')
            start = 1;
        if(start)
            printf("%c",number[i]);
    }
    printf("\t");
}
    

//主函数
void printMaxDigit(int n){
    if(n <= 0)return ;
    char *number = new char[n+1];
    memset(number,'0',n);
    number[n] = '\0';
    //模拟十进制递增
    while(!Increment(number)){
        //打印字符串，从第一个非零字符开始打印
        printNumber(number);
    }
    delete []number;
}

int main(){
	int n =5;
	printMaxDigit(5);
	return 0;
}
```

## 面试题18：删除链表的节点（链表）

> 题目1：在O(1)时间内删除链表节点。
>
> 给定单向链表的头指针和一个节点指针，定义个函数在O(1)时间内删除该节点。链表节点定义如下：
>
> ```C++
> struct listNode
> {
>     int value;
>     listNode* next;
> };
> void deleteNode(listNode* head,listNode* needToDelete);
> ```
>
> 

思路：删除一个节点有两种方法，一个是删除该节点，让前一个节点指向下一个节点。另一个是将该节点的值该为下一个节点的值，然后指向下一个节点的下一个节点，删除下一个节点（好处在于不需要上一个节点）。

需要注意的边界情况：

1. 删除的节点处于链表的尾部
2. 链表只有一个节点，删除的也是这一个节点，就需要删除之后将头节点设置为nullptr。

解法：

```C++
//第一个参数双指针是因为可能会删除头节点
void deleteNode(listNode** head,listNode* needToDelete)
{
    if(!head || !needToDelete)return ;
    //删除的节点不是尾部
    if(needToDelete->next != nullptr)
    {
        listNode* pNext = needToDelete->next;
        needToDelete->value = pNext->value;
        needToDelete->next = pNext->next;
        
        delete pNext;  
        pNext = nullptr;
    }
    //链表只有一个节点，且删除它
    else if(*head == needToDelete)
    {
        needToDelete = nullptr;
        **head = nullptr;
    }
    //链表有多个节点，并且删除的是尾节点，所以需要找到它的前一个节点
    else
    {
        listNode* pNext = *head;
        //寻找前一个节点
        while(pNext->next != needToDelete)
        {
            pNext = pNext->next;
        }
        pNext->next = nullptr;
        delete needToDelete;
        needToDelete = nullptr;
    }
}
```

> 题目2：删除链表中重复的节点
>
> 在一个排序的链表中，如何删除重复的节点

```C++
void deleteDuplication(listNode **head){
    
    if(head == nullptr || *head == nullptr)return ;
    
    listNode *preNode = nullptr;
    listNode *curNode = *head;
    while(curNode == nullptr)
    {
        listNode *pNext = curNode->next;
        if(pNext != nullptr && pNext->value == curNode->value)
        {
            int value = curNode->value;
            listNode* needToDelete = curNode;
            //一直删除直到pNext遇到不相同的数
            while(needToDelete != nullptr && needToDelete->value == value)
            {
                pNext = needToDelete->next;
                
                delete needToDelete;
                needToDelete = nullptr;
                
                needToDelete = pNext;                
            }
            //删除结束之后pre，cur向后进一
            //头结点重复时，head换为下一个节点，pre保持不变（应该不会出现的情况）
            if(preNode == nullptr)
                head = pNext;
            else
                preNode->next = pNext;
            curNode = pNext;
        }
        //没有删除的情况
        else
        {
            preNode = curNode;
            curNode = curNode->next;
        }
    }
}    
```

## 面试题19：正则表达式匹配（状态机）

> 实现一个函数用来匹配'.'和'\*'的正则表达式。模式中的字符'.'表示任意一个字符，'\*'表示表任意出现多次的一个字符，匹配是指字符串的所有字符串匹配整个模式。例如，字符串"aaa"匹配"a\*a"或"a.a"

思路：

1. 如果是字符'.'，则字符匹配。
2. 如果模式字符等于字符串字符，则字符匹配。
3. 如果下一个模式字符不是'\*'，则两者都移动到下一个字符匹配，不匹配返回false。
4. 如果下一个模式字符是'\*'，则有两种情况
   1. 模式字符向后移动两位（即认为\*匹配0个字符或者已经完成匹配）。
   2. 模式字符保持不变（继续匹配*前面的字符）。

解法：

```C++
bool math(char* str,char* pattern)
{
    if(str == nullptr || pattern == nullptr)
        return false;
    return mathCore（str,pattern）;
}

bool mathCore(char* str,char* pattern)
{
    //递归结束条件
    if(*str == '\0' && *pattern == '\0')
        return true;
    if(*str != '\0' && *pattern == '\0')
        return false;
    if(*str == '\0' && *pattern != '\0')
        return false;
    
    if(*(pattern+1) == '*')
    {
        //case1:'a*' == 'a',case2:'.*'=='any'
        if(*pattern == *str || (*pattern == '.' && *str != '\0') )
        {                  
            //模式字符向后移动两位,并完成匹配
            return mathCore(str + 1,pattern + 2)
            //模式字符保持不变,继续匹配
            || mathCore(str + 1,pattern)
            //模式字符向后移动两位,忽略'*'即匹配0个字符
            || mathCore(str ,pattern + 2);
        }
        else
            //模式字符向后移动两位,忽略'*'即匹配0个字符
            return mathCore(str ,pattern + 2);
    }
    //匹配'.'
    if(*str == *pattern || (*pattern == '.' && *str != '\0'))
        return mathCore(str + 1,pattern + 1);
    return false;
}
```

## 面试题20：表示数值的字符串（字符串）

> 题目：实现一个函数用来判断字符串是否表示数值（包括整数和小数）。例如，字符串"+100","5e2","-1023","3.1415926","-1E-16"都表示数值

思路：表示数值的字符串遵循模式$A[.[B]][e|EC]$或者$.B[e|EC]$，其中A为整数部分，B为小数部分，C为指数部分，其中小数可能没有整数部分，比如"0.123"等价于".123"。

1. 先判断整数
2. 再判断小数
3. 再判断指数
4. 三者关系是(A || B ) && C

解法：

```C++
#include <iostream>
#include <vector>
#include <string>


using namespace std;
//检测无符号数字，扫描B部分
bool scanUnsignedInteger(const char** str)
{
    int count = 0;
    while(**str != '\0' && '0' <= (**str) && (**str) <= '9')
    {
        (*str)++;
        count++;        
    }
    return count > 0 ? true : false;
}

//检测有符号数字，扫描A、C部分   
bool scanInteger(const char** str)
{
    if(**str == '-' || **str == '+')
        (*str)++;
    return scanUnsignedInteger(str);
}


bool isNumber(const char* str)
{
    if(str == nullptr)
        return false;
    bool result;
    //扫描A部分
    result = scanInteger(&str);
    //扫描小数部分
    if(*str =='.' )
    {
        str++;
        //可以没有A部分，所以用的或
		//需要先判断小数部分，因为编译器先执行result的判断为真就会忽略之后的判断条件
        result = scanUnsignedInteger(&str) || result; 	
    }
    //扫描E或者e
    if(*str == 'E' ||*str == 'e')
    {
        str++;
        //E前面需要有数字
        result = result && scanInteger(&str);
    }
    //扫描之后字符串需要达到终点
    return result && *str == '\0';
}
int main()
{
	char str[] = "123.5";
	int result = isNumber(str);
	cout<<"result:"<<result<<endl;
	return 0;
}

```

