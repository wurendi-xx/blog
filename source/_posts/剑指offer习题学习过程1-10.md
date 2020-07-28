---
title: 剑指offer习题学习过程1-10
date: 2019-06-19 15:01:00
tags: C++
---
# **剑指offer习题学习过程**
---
## 面试题1：赋值运算符函数
>如下为类型CMyString的声明，为该类型添加赋值运算符函数。

```c++
class CMystring
{
    public:
    CMyString(char* pData = nullptr);
    CMyString(const CMyString& str);
    ~CMyString(void);
    
    private:
    char* m_pData;
}
```

需要注意的点：
+ 是否把返回值的类型声明为该类型的引用。只有返回引用才能允许连续赋值，否则如果返回值为void，则无法连续复制。比如str1=str2=str3。
+ 是否把传入的参数的类型声明为常量引用。
+ 是否释放自身内存，在分配新内存之前释放自身已有空间。
+ 判断传入的参数和当前实例（this*）是不是同一个实例，如果是，则不进行赋值操作，直接返回。
解答：

```C++
CMystring& CMystring::operator=(const CMystring& str){
    if(this!=&str){
        CMystring strTemp(str);//局部变量，自动析构
        
        char* pTemp = strTemp.m_pData; //局部变量，自动析构
        strTemp.m_pData = m_pData;
        m_pData = pTemp;//交换为了避免异常
       
    }
    return *this;//返回一个引用才可以连续赋值，比如str1=str2=str3。
}
```

tips：C++中struct默认访问权限是public，class默认权限是private。

---

## 面试题2：实现Singleton模式

>设计一个类，只能生成该类的一个实例。（设计模式里面的单例模式）

需要注意的点：
+ 单例模式分为两种
  1. 饿汉式：即类产生的时候就创建好实例对象，这是一种空间换时间的方式
  2. 懒汉式：即在需要的时候，才创建对象，这是一种时间换空间的方式	
+ C++单例记得初始化静态变量
+ 注意线程的影响
1. 单线程中最基本的
```C#
public sealed class Singlenton1//sealed代表密封的类，无法进行派生
{
    private Singleton1(){ }
    private static instance = null;//C#可以在类中进行初始化
    public static Singleton Instance
    {
        get
        {
            if(instance == null)
            instance = new Singleton1;
            
            return instance;
        }
    }
}
```
2. 多线程中使用
```C++
//注意到实现中m_pInstance和GetInstance都是静态的，所以没有创建对象就已经存在了。通过调用GetInstance来创建或者获取唯一的对象
#include<iostream>
using namespace std;
class CSingleton{
private:
    CSingleton(){}                            
    //1.构造函数是私有的，不能通过构造函数创建该类的实例
    static CSingleton *m_pInstance;           
    //2.静态成员变量，且是私有的，指向一个CSingleton实例，同一时间只存在一个这个变量，所以只能存在一个CSingleton的实例
public:
    static CSingleton *GetInstance(){         
    //3.只能通过这个函数来创建并获得一个CSingleton实例，且这个实例是唯一的（因为没有其他途径创建CSingleton实例，构造函数是私有的）
    if(m_pInstance == NULL){//防止每次锁定导致线程堵塞。
    lock();//线程锁
    if(m_pInstance == NULL){
            m_pInstance = new CStingleton;
        }
        unlock();
        }
        
        return m_pInstance;
    }
};

CSingleton *CSingleton::m_pInstance = NULL;    //4.初始化类的静态成员变量
```

---

## 面试题3：数组中重复的数字（数组）

>题目一：找出数组中重复的数字
>
>​	在一个长度为n的数组里的所有数字都在0~n-1的范围内。并不知道其中有几个重复的，重复几次。请找出数组中任意重复的数字。
>
>eg：input:{2,3,1,0,2,5,3}
>
>output:2或者3

思路1：数组排序，然后从头到尾扫描即可，时间复杂度O(nlogn)。

思路2：用哈希表解决问题，时间复杂度O(n)，空间复杂度O(n)。

思路3：利用数组中数字小于n做文章。遍历将i与sample[i]通过交换一一对应，过程中发现两次对应就找到重复数字。时间复杂度O(n),空间复杂度O(1)。

input:sample[N]
for $i =1\to N$
if $i == sample[i]$
then $i\gets i+1$
​	else if $sample[i] == sample[sample[i]]$
​	then return sample[i]
​		else $swap(sample[i],sample[sample[i]])$

解答：

```C++
bool duplicate(int numbers[],int length,int* duplication){
    if(numbers == null || length <= 0){
        return false;
    }
    for(int i = 0;i < length;i ++){
        if(length <= numbers[i] || 0 > numbers[i]){
            return false;
        }
    }
    for(int i = 0;i < length;i ++){
        if(numbers[i] != i){
            if(numbers[i] != numbers[numbers[i]])
            swap(numbers[i],numbers[numbers[i]]);
            else{
                *duplication = numbers[i];
                return true;
            }           
        }
        else continue;
    }
    return false;
}
```

> 题目二：不修改数组找出重复的数字
>
> ​	在一个长度为n+1的数组里所有数字都在1~n的范围内，所以数组中至少有一个数字是重复的。请找出数组中任意一个重复的数字，但不能修改输入的数组。例如，如果输入长度为8的数组{2,3,5,4,3,2,6,7}，那么对应输出的重复数字应该是2或者3。

1. 以时间换空间（时间复杂度O(nlogn)，空间复杂度O(1)）
2. 以空间换时间（时间复杂度O(n)，空间复杂度O(n)）

1：利用二分法的思路，把1~n分为1~m和m+1~n，然后检测两者在数组中占有的个数，大于自身大小时即发现重复数。

2：用哈希表的思路，新建一个大小相同的数组，下标代替实际数值，就很容易发现。

解答：

```C++
int getDuplication(const int *numbers, int length) {
    if (numbers == nullptr || length <= 0)return -1;

    int start = 1, end = length - 1;
    while (start < end) {
        int lowCnt = 0;
        int mid = start + ((end - start) >> 1);
        for (int i = 0; i != length; i++) {
            if (numbers[i] <= mid && numbers[i] >= start) {
                lowCnt++;
            }
        }

        if (lowCnt > (mid - start + 1)) {
            end = mid;
        }
        else {
            start = mid + 1;
        }
    }

    return start;
}
```

## 面试题4：二维数组的查找（二维数组）

> 题目：在一个二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

思路：从右上角或者左下角开始查找，每次对比都能剔除一列或者一行

```C++
//从左下角开始查找
boll find(int target,vector<vector<int>> &input)
{
    int row = input.size();
    if(0 == row) return false;
    int col = input[0].size();
    if(0 == col) return false;
    //左下角开始
    int i = row-1;
    int j = 0;
    while(0 <= i || col > j){
        if(target == input[i][j]){
            return true;
        }
        else if(target > input[i][j]){
            j++;
        }else{
            i--;
        }   
    }
    return false;    
}
```

## 面试题5：替换空格（字符串）

>将字符串中的空格替换为%20。（背景：因为URL参数中含有特殊符号时需要转化为%+ASCII码的样式）

思路：先遍历一次字符串，获得所有空格的个数，然后得到现有字符串的长度=原有字符串长度+2*空格个数。之后定义两个指针，P1指向原有字符串的末尾，P2指向现有字符串的末尾，从后向前扫描，遇到空格后进行替换。做到时间复杂度O(n)。

```C++
bool replaceBlank(char input[],length){
    if(null == input || 0 >= length )return false;
    
    int originalLength = 0;
    int currentLength = 0;
    int blankCount = 0;
    char *tmp = input;
    while(*tmp != '\0'){
        if(*tmp == ' ')blankCount ++;
        originalLength++;
        tmp++;
    }
    currentLength = originalLength + blankCount*2;
    
    if(currentLength+1 > length)return false;
    input[currnetLength]='\0';
    int P1 = originalLength-1;
    int P2 = currnetLength-1;
    for(int i = originalLength-1;i >0;i--){
        if(input[1] != ' '){
            input[P2--] = input[i];
        }else{	
            input[P2--] = '0';
            input[P2--] = '2';
            input[P2--] = '%';
        } 
    }
}
```

## 面试题6：从尾到头打印链表（链表）

> 从尾到头打印链表

思路：利用栈stack先进后出的特性实现，或者用递归函数实现（不推荐）。



```C++
struct ListNode {
    int val;
    ListNode *next;
};
//stack 实现
void printFromTailToHead(ListNode *head){
    stack<int> tmp;
    while(head != nullnullptr){
        tmp.push(head->val);
        head = head->next;
    }
    while(!tmp.empty()){
        printf("%d",tmp.top());
        tmp.pop();
    }
} 
//递归实现
void printFromTailToHead2(ListNode *head){
    if(head != nullptr){
        if(head->next != nullptr){
            printFromTailToHead2(head->next);
        }
        printf("%d",head->val);
    }
}
```



## 面试题7：重建二叉树（树）

> 输入某二叉树的前序遍历和中序遍历的记过，请重建该二叉树。

思路：前序遍历root->left->right，中序遍历left->root->right。由此可以根据前序遍历找到根节点，再由中序遍历找到左子树和右子树。然后用递归重构出整个树。

前序：

| 1    | 2    | 4    | 7    | 3    | 5    | 6    | 8    |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| root | 左   | 子   | 树   | 右   | 子   | 树   |      |

中序：

| 4    | 7    | 2    | 1    | 5    | 3    | 8    |      |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 左   | 子   | 树   | root | 右   | 子   | 树   |      |

```C++
struct binaryTreeNode
{
    int val;
    binaryTreeNode *m_left;
    binaryTreeNode *m_right;
    binaryTreeNode(int x) :val(x), m_left(nullptr), m_right(nullptr) {}
}

binaryTreeNode *reConstructBinaryTree(vector<int> preorder,vector<int> inorder){
    //检测输入
    if(0 == preorder.size() || preorder.size() == inorder)
        return nullptr;
    
    int root = preorder[0];
    binaryTreeNode *newNode = new binaryTreeNode(root);
    //递归结束条件
    if(1 == preorder.size())return newNode;
    
    auto rootInorder = find(inorder.begin(),inorder.end(),root);
    if(rootInorder == inorder.end())return nullptr;
    int leftSize = rootInorder - inorder.begin();
    int rightSize = inorder.end() - rootInorder -1;
    //递归
    //两个参数分别代表前序和中序里的左子树的范围
    newNode->m_left = reConstructBinaryTree(
        vector<int> (preorder.begin()+1,preorder.begin()+leftSize+1),
        vector<int> (inorder.begin(),inorder.begin()+leftSize));
    //两个参数分别代表前序和中序里的右子树的范围
    newNode->m_left = reConstructBinaryTree(
        vector<int> (preorder.begin()+leftSize+1,preorder.end()),
        vector<int> (inorder.begin()+leftSize+1,inorder.end()));
       
}
//测试
int main()
{
    vector<int> pre{1,2,4,7,3,5,6,8};
    vector<int> vin{4,7,2,1,5,3,8,6};

    TreeNode *newRoot = reConstructBinaryTree(pre, vin);

    system("pause");
    return 0;
}

```



## 面试题8：二叉树的下一个节点

> 给定一个二叉树和其中的一个节点，如何找出中序遍历序列的下一个节点？树中的节点除了有两个分别指向左右子节点的指针，还有一个指向父节点的指针。

思路：left->root->right

1. 如果该节点有右子树，则它的下一个节点是其右子树的最左子节点。（节点为root）
2. 如果该节点没有右子树，但是它本身是其父节点的左子节点，那么它的下一个节点就是其父节点。（节点为left）
3. 如果如果该节点没有右子树，并且是其父节点的右子节点，则需要不断寻找父节点，直到找到一个节点是其父节点的左子节点，那么它的下一个节点是该节点的父节点。（节点是right?）
4. 都没有找到，就说明不存在下一个节点，返回nullptr。

```C++
struct treeLinkNode {
    int val;
    struct treeLinkNode *left;
    struct treeLinkNode *right;
    struct treeLinkNode *parent;
    treeLinkNode(int x) :val(x), left(NULL), right(NULL), next(NULL) {}
};

treeLinkNode *getNext(treeLinkNode *pNode){
    if(nullptr == pNode)return nullptr;
    
    if(pNode->right != nullptr){
        pNode = pNode->right;
        while(pNode->left != nullptr){
            pNode = pNode->left;
        }
        return pNode;
    }
    else {
        while(pNode->parent != nullptr){
            treeLinkNode* pRoot = pNode->parent;
            if(pRoot->left == pNode){
                return pRoot;
            }
            pNode = pNode->parent;
        }
    }
    return nullptr;
}


```

## 面试题9：使用两个栈实现队列（栈）

> 用两个栈实现一个队列。队列的声明如下，请实现它的两个函数appendTail和deleteHead，分别再队列尾部插入节点和再队列头部删除节点。

队列的声明：

```C++
template <typename T> class CQueue
{
public:        
	CQueue(void);
	~CQueue(void);


	void appendTail(const T& node);
	T deleteHead();
private:
    stack<T> stack1;
    stack<T> stack2;   
}
```

思路：插入操作使用常规push即可。删除操作可以将stack1中的所有元素push到stack2中，这样顺序正好相反，pop操作即删除操作。需要注意的地方是当stack2中元素不为空时，添加操作是否会造成影响，答案是不会。

```C++
template <typename T> 
void CQueue<T>::appendTail(const T& node){
    stack1.push(node);
}
template <typename T> 
T CQueue<T>::deleteHead(){
    if(0 != stack2.size()){
        while(0 != stack1.size()){
            T tmp = stack1.top();
            stack1.pop();
            stack2.push(tmp);
        }
    }
    if(0 == stack2.size())
        throw new exception("queue is empty!");
    T tmp = stack2.top();
    stack2.pop();
    
    return tmp;           
}
```

## 面试题10：斐波那契数列（循环与递归）

> 题目1：求斐波那契数列的第n项

思路：f(n)=f(n-1)+f(n-2)

递归解法（效率太低）：

```C++
long long Fibonacci(unsigned int n){
    if(0 >= n)return 0;
    if(1 == n) return 1;
    return Fibonacci(n-1)+Fibonacci(n-2);
}
```

正常解法：

```C++
long long Fibonacci(unsigned int n){
    if(0 >= n)return 0;
    if(1 == n) return 1;
    
    long long tmp1 = 0;
    long long tmp2 = 1;
    long long sum;
    for(int i = 2;i <= n;i++){
        sum = tmp2 + i;
        tmp1 = tmp2;
        tmp2 = sum;
    }
    return sum;
}
```

>题目2：青蛙跳台阶问题
>
>一直青蛙啊一次可以跳上1级台阶，也可以跳上2级台阶。求该青蛙跳上一个n级台阶总共有多少种跳发。

思路：将n级台阶跳法看成一个函数，如果第一次跳1级，则后面会有f(n-1)中方法，如果第一次跳2级，则后面会有f(n-2)中方法，则f(n)=f(n-1)+f(n-2)。其实也是斐波那契数列。

> 扩展：如果青蛙可以跳上n级台阶，其他条件不变，则用数学归纳法可以证明f(n)=2^(n-1)。

> 变种：用2x1的小矩形去覆盖一个更大的矩形，如果用8个2x1的矩形去覆盖一个2x8的大矩形，则一共会有多少种方法。

思路：将第一个矩形竖直放置的时候，右边还剩2x7的区域，会有f(7)的方法。将第一个矩形横向放置的时候，需要在下面还添加一个2x1的矩形，则右边还剩2x6的区域，会有f(6)的方法。则f(8)=f(7)+f(6)，实质上还是斐波那契数列。
