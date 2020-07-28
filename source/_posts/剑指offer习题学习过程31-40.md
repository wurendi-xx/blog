---
title: 剑指offer习题学习过程31-40
date: 2019-06-19 15:01:54
tags: C++
---
## 面试题31：栈的压入、弹出序列

> 题目：输入两个整数序列，第一个序列表示栈的压入顺序，请判断第二个序列是否为该栈的弹出顺序。假设压入栈的所有数字均不相等。例如，序列{1,2,3,4,5}是某栈的压栈序列，序列{4,5,3,2,1}是该栈序列对于的一个弹出序列，但{4,3,5,1,2}就不可能是该压栈序列的弹出序列。
>
> 比如压入序列{1,2,3,4,5}，弹出序列{4,5,3,2,1}。
>
> | 步骤 | 操作  | 栈      | 弹出数字 | 步骤 | 操作  | 栈    | 弹出数字 |
> | ---- | ----- | ------- | -------- | ---- | ----- | ----- | -------- |
> | 1    | 压入1 | 1       |          | 6    | 弹出  | 1,2   | 3        |
> | 2    | 压入2 | 1,2     |          | 7    | 压入5 | 1,2,5 |          |
> | 3    | 压入3 | 1,2,3   |          | 8    | 弹出  | 1,2   | 5        |
> | 4    | 压入4 | 1,2,3,4 |          |      |       |       |          |
> | 5    | t弹出 | 1,2,3   | 4        |      |       |       |          |

思路：从弹出序列来看，如果下一个弹出的数字正好是栈顶数字，那么直接弹出；如果不在栈顶，就一直压栈直到遇到栈顶数字，如果所有数压栈结束还没有找到弹出数字，就不是该序列的弹出序列。

解法：

```C++
bool isPopOrder(const int* pushOrder,const int* popOrder,int length)
{
    bool result = false;
    if(length > 0 && popOrder != nullptr && pushOrder != nullptr)
    {
        const int* nextPush = pushOrder;
        const int* nextPop = popOrder;
        
        stack<int> tmpStack;
        while(nextPop - popOrder < length)
        {
            while(!tmpStack.empty() || tmpStack.top() != *nextPop)
            {
                if(nextPush - pushOrder == length)
                break;
            
            	tmpStack.push(*nextPush);
            
            	nextPush++;
            }
            //一直找不到弹出数字时跳出
            if(tmpStack.top() != *nextPop)
                break;
            //相等时弹出
            else                
            {
                tmpStack.pop();
            	nextPop++;
            }
        }
        //当压入数列和辅助栈都为空，完成所有弹出
        if(tmpStack.empty() && nextPop - popOrder == length)
            result = true;        
    }
    return result;
}
```

## 面试题32：从上到下打印二叉树（广度优先）

> 题目一：不分行从上到下打印二叉树
>
> 从上到下打印出二叉树的每个节点，同一层的节点按照从左到右的顺序打印。

思路：用队列实现节点的打印。每次打印一个节点的时候，如果该节点有子节点，则把子节点放到一个队列的末尾，再将从队列头部去除下一个节点。重复前面的操作直至完成打印。

解法：

```C++
void printBinaryTreeFromTopToBottom(binaryTreeNode* root)
{
    if(root == nullptr)return;
    //辅助队列
    deque<binaryTreeNode*> dequeTreeNode;
    
    dequeTreeNode.push_back(root);
    
    while(dequeTreeNode.size() != 0)
    {
        //如果有子节点，则保存到尾部
        if(dequeTreeNode.front()->left != nullptr)
            dequeTreeNode.push_back(dequeTreeNode.front()->left);
        if(dequeTreeNode.front()->right != nullptr)
            dequeTreeNode.push_back(dequeTreeNode.front()->right);
        //打印头部节点并弹出
        cout<<dequeTreeNode.top();
        dequeTreeNode.pop_front();
    }
}

```

> 题目二：分行从上到下打印二叉树
>
> 从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到每一行。

思路：和第一题相似，多出两个变量，一个变量表示再当前层中还没有打印的节点数，另一个变量表示下一层节点的数目。

解法：

```C++
void printBinaryTreeFromTopToBottom(binaryTreeNode* root)
{
    if(root == nullptr)return;
    
    deque<binaryTreeNode*> dequeTreeNode;
    
    dequeTreeNode.push_back(root);
    int curCount = 1;
    int nexCount = 0;
    while(dequeTreeNode.size() != 0)
    {

        if(dequeTreeNode.front()->left != nullptr)
        {
            dequeBinaryTreeNode.push_back(dequeTreeNode.front()->left);
            nexCount ++;
        }
        if(dequeTreeNode.front()->right != nullptr)
        {
            dequeBinaryTreeNode.push_back(dequeTreeNode.front()->right);
            nexCount ++;
        }

        cout<<dequeTreeNode.top();
        dequeTreeNode.pop_front();
        curCount--;

        if(curCount == 0)
        {
            curCount = nexCount;
            cout<<endl;
            nexCount = 0;
        }

    }
}
```



> 题目三：之字形打印二叉树。
>
> 即第一层从左到右打印，第二层从右到左打印，以此类推。

思路：需要定义两个栈，一个栈用来保存奇数层，一个栈用来保存偶数层。如果时奇数层，则先保存左节点再保存右节点（奇数层的下一个层偶数层需要从右到左打印）。如果时偶数层，则先保存右节点，再保存左节点（偶数层的下一个奇数层需要从左到右打印）。

解法：

```C++
void print(binaryTreeNode* root)
{
    if(root == nullptr)return;
    
    stack<binaryTreeNode*> level[2];
    level[0].push(root);
    int cur = 0;
    int next = 1;
    
    while(!level[0].empty() || !level[1].empty())
    {
        binaryTreeNode* tmpNode = level[cur].top();
        level[cur].pop();
        cout<<tmpNode->value;
        
        if(cur == 0)
        {
            if(tmpNode->left != nullptr)
                level[cur].push(tmpNode->left);
            if(tmpNode->right != nullptr)
                level[cur].push(tmpNode->right);            
        }
        if(cur == 1)
        {
            if(tmpNode->right != nullptr)
                level[cur].push(tmpNode->right);
            if(tmpNode->left != nullptr)
                level[cur].push(tmpNode->left);            
        }
        if(level[cur].empty())
        {
            cout<<endl;
            //用来实现0和1的交替赋值
            cur = 1 - cur;
            next = 1 - next;
        }
    }
}
```

## 面试题33：二叉搜索树的后序遍历序列

> 题目：输入一个整数数组，判断该数组是不是某二叉搜索树的后续遍历结果。假设输入数组中数字互不相同。

思路：后序遍历：left->right->root。先 从最后找到根节点，比根节点小的就是左节点，大的就是右节点。递归直到不再产生左右子树即只剩一个根节点。

```C++
bool isSquenceOfBTS(int input[],int length)
{
    if(length == 0 || input == nullptr)return false;
    
    int root = input[length-1];
    //找左节点
    int i = 0;
    for(;i < length-1 ;i++)
    {
        if(root < input[i])
            break;
    }
    //找右节点，并且判断右节点是不是大于根节点
    int j = i+1;
    for(;j < length-1 ;j++)
    {
        if(root > input[i])
            return false;
    }
    
    bool left = true;
    if(i > 0)
        left = isSquenceOfBTS(input,i);
     bool right = true;
    //减去1是因为排除了根节点
    if(i < length - 1)
        right = isSquenceOfBTS(input + i,length - i - 1);
    
    return left && right;   
}
```

## 面试题34：二叉树中和为某一值的路径
>题目：输入一棵二叉树和一个整数，打印出二叉树中节点值的和为输入整数的所有路径。从树的根节点开始往下一直到叶节点所经过的而节点形成一条路径。
思路：用前序遍历的方法访问所有节点，并把经过的路径累加起来并保存再一个栈中，当遇到叶节点并且累加值等于目标值时，打印路径所有的节点。否则继续访问父节点，并且回退时需要减去当前叶节点。其中由于需要打印整个节点，所以不能直接stack容器，可以选用vector容器代替。
解法：
```C++
void finePath(binaryTreeNode* root,int target,vector<int>& path,int curSum)
{
    curSum += root->value;
    path.push_back(root->value);
    
    bool isLeaf = root->left == nullptr && root->right == nullptr; 
    //找到目标路径
    if(target == curSum && isLeaf)
    {
        cout<<"path: ";
		for_each(input.begin(),input.end(),[](auto tmp){cout<<tmp<<'\t';});
        cout<<endl;
    }
    //如果不是叶节点，就继续遍历子节点。
    if(root->left != nullptr)
    {
        finePath(root->left,target,path,curSum);
    }    
    if(root->right != nullptr)
    {
        finePath(root->right,target,path,curSum);
    }
    //是叶节点，但不是目标路径，返回父节点前删除当前节点
    //书中这里没有减去当前值
    curSum -= root->value;
    path.pop_back();

}
void finePath(binaryTreeNode* root,int target)
{
    if(root == nullptr)return;
    
    vector<int> path;
    int curSum = 0;
    findPath(root,target,path,curSum);
}
```

## 面试题35：复杂链表的复制

> 题目：实现函数complexListNode* clone(complexListNode* head)，复制一个复杂链表。再复杂链表中，每个节点除了有一个next指向下一个系欸但，还有一个sibling指针指向链表中的任意节点或者nullptr。节点的定义如下：
>
> ```C++
> struct complexListNode
> {
>     int value;
>     complexListNode* next;
>     complexListNode* sibling;    
> };
> ```

思路：三种方法：

1. 第一步先复制原始链表上的每一个节点，并用next链接起来。第二步设置每个节点的sibling指针。由于需要定位S的位置需要从原始链表的头节点开始找，找到后需要在复制链表中遍历到S，时间复杂度$O(n^2)$。
2. 第一步仍然是复制每一个节点N到N'，把<N,N'>的配对信息放到一个哈希表中。第二步还是设置复制链表中每个节点的sibling指针，由于有哈希表，能以O(1)的时间找到S'。
3. 第一步仍然复制每个节点，但是是把节点N'链接到N后面，然后原始链表中N的后一个元素链接到N'的后面。这样sibling指针就可以直接指向原始S的后面。

解法3：

```C++
//第一步，复制N'
void cloneNode(complexListNode* head)
{
    complexListNode* tmpNode = head;
    if(tmpNode != nullptr)
    {
        complexListNode* cloneNode = new complexListNode();
        cloneNode->value = tmpNode->value;
        //N的next链接到N'后面
        cloneNode->next = tmpNode->next;
        cloneNode->sibling = nullptr;
        //N'链接到N后面
        tmpNode->next = cloneNode;
        //N迭代
        tmpNode = cloneNode->next;
    }
}
//第二步，复制sibling指针
void cloneSiblingNode(complexListNode* head)
{
    complexListNode* tmpNode = head;
    while(tmpNode != nullptr)
    {
        //取得N'
        complexListNode* cloneNode = tmpNode->next;
        if(cloneNode != nullptr)
        {
            cloneNode->sibling = tmpNode->sibling->next;
        }
        tmpNode = cloneNode->next;        
    }
}
//第三步，拆分两个链表
complexListNode* reconnectNode(complexListNode* head)
{
    complexListNode* tmpNode = head;
    complexListNode* cloneNode = nullptr;
    complexListNode* cloneHead = nullptr;
    //初始化赋值链表的头部
    if(tmpNode != nullptr)
    {
        cloneHead = tmpNode->next;
        cloneNode = cloneHead;
        tmpNode->next = cloneNode->next;
        tmpNode = tmpNode->next;
    }
    
    while(tmpNode != nullptr)
    {
        //将复制指针节点相连
        cloneNode->next = tmpNode->next;
        //复制指针迭代
        cloneNode = cloneNode->next;
        //原始指针相连
        tmpNode->next = cloneNode->next;
        //原始指针迭代
        tmpNode = tmpNode->next;
    }
    return cloneHead;
}

listNode* complexListNodeClone(listNode* head)
{
    cloneNode(head);
    reconnectNode(head);
    listNode* result = reconnectNode(head);
    return result;
}
```

## 面试题36：二叉搜索树与双向链表

> 题目：输入一课二叉搜索树，将该二叉搜索树转换成一个排序的双向链表。要求不能创建任何新的节点，只能调整树中节点指针的指向。二叉树的定义如下
>
> ```C++
> struct binaryTreeNode
> {
>     int value;
>     binaryTreeNode* left;
>     binaryTreeNode* right;
> };
> ```

思路：二叉树中左节点看作指向前面节点的指针，右节点看作指向后面节点的指针。由于要求转换后的链表是排序好的，所以需要中序遍历。其中链表用尾部指针来获取整个链表，因为left->root->right，每次访问root，与left做链表操作。

解法：

```C++
binaryTreeNode* convertCore(binaryTreeNode* root,binaryTreeNode** lastListNode)
{
    if(root == nullptr)return;
    
    binaryTreeNode* cur = root;
    
    if(root->left != nullptr)
        return convertCore(root->left,lastListNode);
    //中序遍历顺序
    //向前指针链接
    cur->left = *lastListNode;
    if(*lastListNode != nullptr)
        //向后指针链接
        (*lastListNode)->right = cur;
    //尾部指针迭代
    *lastListNode = cur;    
    
    if(root->right != nullptr)
        return convertCore(root->right,lastListNode);    
}

binaryTreeNode* convert(binaryTreeNode* root)
{
    binaryTreeNode* lastListNode = nullptr;    
    convertCore(root,&lastListNode);
    //lastListNode是链表的尾节点，需要再或者其头节点
    binaryTreeNode* headListNode = lastListNode;    
    while(headListNode != nullptr && headListNode->left != nullptr)
        headListNode = headListNode->left;
    return headListNode;
}
```

## 面试题37：序列化二叉树

> 题目：实现两个函数，分别用来序列化和反序列化二叉树

思路：根据前序遍历的顺序来序列化二叉树，并且在遇到nullptr指针时，将其序列化为一个特殊字符（比如'$'），用来提示节点停止，两个节点间用','分割。

反序列化就用前序遍历实现。

解法：

```C++

void binaryTreeToString(binaryTreeNode* root,string& output)
{
    if(root == nullptr)
    {
        output = output + "$,";
        return;
    }
    output = output + itos(root->value) + ',';
    binaryTreeToString(root->left,output);
    binaryTreeToString(root->right,output);    
}


void stringToBinaryTree(binaryTreeNode** root,istream& stream)
{
    string item;
    getline(stream,item,',');
    if(item == '$')return;
    if(item > '0' && item < '9')
    {
        root = new binaryTreeNode(stoi(item));
        stringToBinaryTree(&((*root)->left),stream);
        stringToBinaryTree(&((*root)->right),stream);    
    }
}

```

## 面试题38：字符串的排列（排列问题，涉及8皇后）

> 题目：出入一个字符串，打印出该字符串中字符的所有排列。例如abc有abc、acb、bca、cab、cba六种。

思路：将排列看出由两部分组成，一个字符和剩余字符。求排列其看做两步：

1. 求出所有可能在第一个位置的字符。
2. 固定第一个字符，然后求剩余字符的排列，直到只剩一个字符。

解法：

```C++
void printArrange(char* input,char* pBegin)
{
    
    if(*pBegin == '\0')cout<<input<<endl;
    else
    {
        for(char* charIterator = pBegin;*charIterator != '\0';charIterator++)
        {
            char tmp = *charIterator;
            *charIterator = *pBegin;
            *pBegin = tmp;

            printArrange(input,pBegin+1);
            //交换之后需要复原给下一次迭代使用
            tmp = *charIterator;
            *charIterator = *pBegin;
            *pBegin = tmp;

        }
	}    
}

void printArrange(char* input)
{
    if(input == nullptr)return;
    char* pBegin = input;
    printArrange(input,pBegin);
}
```

> 题目：输入一个含有8个数字的的数组，判断有没有可能把这8个数字分别放到正方体的8个顶点上，使得正方体上三组相对的面上的4个顶点和都相等。

思路：实际上就是求8个数组的所有排列，然后判断有没有符合$a_1+a_2+a_3+a_4 == a_5+a_6+a_7+a_8,a_1+a_3+a_5+a_7 == a_2+a_4+a_6+a_8,a_1+a_2+a_5+a_6 == a_3+a_4+a_7+a_8$的排列组合。可以用next_permutation来取得所有组合。

```C++
bool isCube(vector<int> &input)
{
    sort(input.begin(),input.end());
    while(next_permutation(input.begin(),input.end()))
    {
        bool result = 
            (input[1]+input[2]+input[3]+input[4])
            == (input[5]+input[6]+input[7]+input[8])
            && (input[1]+input[3]+input[5]+input[7])
            == (input[2]+input[4]+input[6]+input[8])
            && (input[1]+input[2]+input[5]+input[6])
            == (input[3]+input[4]+input[7]+input[8]);
        if(result == true)return result;
    }
    return false;
}
```

> 题目：8皇后问题（用排列解决）

思路：定义一个数组index[8]，数组中第i行数组代表皇后所在的列数。先将其中的数字用0~7初始化，然后对其全排列。由于行数和列数肯定不想同，所以只要判断是否在同一条对角线上，即i-j == index[i]-index[j]或者j - i == index[i] -index[j]。

解法（排列）：

```C++
void printQueen( )
{
    vector<int> queen = {0,1,2,3,4,5,6,7};    
	int count = 0;
    while(next_permutation(queen.begin(),queen.end()))
    {
		bool result = true;
        for(int i = 0;i < 8;i++){
            for(int j = i+1;j < 8;j++)
            {
                bool tmp = abs(i - j) != abs(queen[i] - queen[j]);
				result = result && tmp;
            }
        }
		if(result == true)
		{
			count++;
			for(int i = 0;i < 8;i++)
			{
				vector<int> tmp(8,0);
				tmp[queen[i]] = 1;
				for_each(tmp.begin(),tmp.end(),[](auto a){cout<<a<<' ';});
				cout<<endl;
			}
			cout<<endl;
		}
    }
	cout<<"count of queen: "<<count;
    return ;
}
```

解法（回溯）：

```C++
#include <iostream>
#include <vector>
#include <string>
#include <queue>
#include <sstream>
#include <algorithm>

using namespace std;

bool attack(vector<int>& input,int row,int col)
{
    //i代表其他的皇后的行，input[i]就是列
    int i = 0;
    bool result = false;
    while(!result && i < row)
    {
        result = (input[i] == col) || 
            (abs(i - row) == abs( input[i] - col));
        i++;
    }
    return result;
}
//打印棋盘
void printQueen(vector<int>& input)
{ 
	for(int i = 0;i < 8;i++)
	{
		vector<char> tmp(8,'-');
		tmp[input[i]] = 'Q';
		for_each(tmp.begin(),tmp.end(),[](auto a){cout<<a<<' ';});
		cout<<endl;
	}
	cout<<endl;
    return ;
}
//q代表皇后的行数
void placeQueen(vector<int>& input,int q)
{
    //i代表皇后的列数
    int i = 0;
    while(i < 8)
    {
        if(!attack(input,q,i))
        {
			//存储皇后位置
            input[q] = i;            
            if(q == 7)
                printQueen(input);
            else
                placeQueen(input,q + 1); 
        }
        i++;
    }
}


int main()
{
	vector<int> input(8,0);
	placeQueen(input,0);
	return 0;
}
```

## 面试题39：数组中出现次数超过一半的数字

> 题目：数组中有一个数字出现次数超过数组长度的一半，请找出这个数字。

思路：两种方法，一个会破坏数组，一个不会。

1. 利用快速排序的思想求出第k大的数字。由于超过长度的一半，所以中间的数字即为所求。
2. 由于出现次数超过长度的一半，换句话说就是其出现次数比其他所有的都多。可以设定两个数，一个保存当前遍历的数，另一个保存其出现的次数，如果遇到相同的就加1，不同的就减1，计数小于0就换下一个数字。可以保证最后出现次数大于0的数即为要找到的数。

其中需要注意输入数组如果没有出现次数超过一半的数字，即在找到目标数字后检测其次数是否超过一半。

解法2：

```C++
bool checkAboveHalfTimes(vector<int> input,int target)
{
    int length = input.size();
    int times = 0;
    for(auto tmp : input)
    {
        if(target == tmp)
            times++;
    }
    if(times*2 > length)return true;
    else return false;
}
int maxTimesNumber(vector<int> input)
{
    int length = input.size();
    if(length < 1)return 0;
    int result = input[0];
    int times = 1;
    for(int i = 1;i < length;i++)
    {
        if(times == 1)
            result = input[i];
        if(input[i] == result)
            times++;
        else times--;

    }
    if(checkAboveHalfTimes(input,result))
    	return result;
    else return 0;
    
}
```

## 面试题40：最小的k个数

> 题目：输入n个整数，找出其中最小的k个数。例如：输入4、5、1、6、2、7、3、8这8个数字，则最小的4个数字是1、2、3、4.

思路：利用快速排序，partition函数，来解决问题。当位于选中数字左边k个数字就是最小的k个数字，其中这k个数字不是排序的。时间复杂度为O(n)。

思路2：创建一个大小为k的数据容器来存储最小的k个数字。如果容器已有的数字小于k个，则直接加入。如果容器已满，则找到最大值与其对比，比最大值小的话就代替。
所以就需要一个能随时获得最大值的容器，并且删除和插入时间复杂度为O(logk)。比如堆，比如STL中的multiset（红黑树）。（优点处理海量数据，不会修改原数组）

解法1：

```C++
void getLeastKNumber(vector<int>& input,vector<int>& output,int k)
{
    int length = input.size();
    if(length == 0 || k < 1)return;
    vector<int> result;
    auto start = input.begin();
    auto end = input.end();
    int target = input[0];
    //partiton返回第一个不满足p的迭代器
    auto index = partition(input.begin(),input.end(),[target](auto tmp){return tmp < target;});
        while(distance(input.begin(),index) != k-1)
        {
            if(distance(input.begin(),index) > k-1)
            {
                end = index - 1;
				auto pivot = *next(start, distance(start,end)/2);
                index = partition(start,end,[pivot](auto tmp){return tmp < pivot;});
            }
            else 
            {
                start = index + 1;
				auto pivot = *next(start, distance(start,end)/2);
                index = partition(start,end,[pivot](auto tmp){return tmp < pivot;});
            }
			

        }
    for(int i = 0;i < k;i++)
    {
        output.push_back(input[i]);
    }    
}
```

解法2：

```C++
void getLeastKNumber(vector<int>& input,vector<int>& output,int k)
{
    multiset<int,greater<int>> kNumber;
    int length = input.size();
    if(length < k)return;
    for(int i = 0;i < k;i++)
    {
        kNumber.insert(input[i]);
    }
    for(int i = k - 1;i < length;i++)
    {
        if(input[i] < *kNumber.begin())
        {
            kNumber.erase(kNumber.begin());
            kNumber.insert(input[i]);
        }
    }
    for(auto iter = kNumber.begin();iter != kNumber.end();iter ++ )
    {
        output.push_back(*iter);
    }
}
```


















