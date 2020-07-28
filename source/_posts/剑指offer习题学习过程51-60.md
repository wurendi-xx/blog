---
title: 剑指offer习题学习过程51-60
date: 2019-06-19 15:02:23
tags: C++
---
## 面试题51：数组中的逆序对

> 题目：在数组中的两个数字，如果前面一个数字大于后面的数字，则这两个数字组成一个逆序对。输入一个数组，求出这个数组的逆序对的个数。例如，在数组{7,5,6,4}中,一共有5个逆序对，分别是(7,6),(7,5),(7,4),(6,4),(5,4)。

思路：暴力算法的时间复杂度是$O(n^2)$。

每扫描到一个数，为了避免拿它和后面每一个数进行比较，考虑先比较两个相邻的数字。（利用并归排序的思想）
统计逆序对的过程：先把数组分隔成子数组，统计出子数组内部的逆序对的数目，统计完之后进行排序，之后再统计相邻子数组之间的逆序对的数目。

解法：

```C++
int inversePairs(vector<int> input)
{
    int length = input.size();
    if(length < 1)return 0;
    vector<int> copyInput;
	copyInput = input;
    int count = inversePairsCore(input,copyInput,0,length - 1);
    
    return count;
}

int inversePairsCore(vector<int> &input,vector<int> &copyInput,int start,int end)
{
    if(start == end)
    {
        copyInput[start] = input[start];
        return 0;
    }

    int length = (end - start)/2;
	//这里特别需要注意原数组和辅助数组所在的位置，这里递归很不好理解，每次返回data(input)都是有序的（调用内部对data，即函数内部的tmp排序）
    //出来过后data有序了，又使用data对copyInput排序，这样外部的data又是有序的了
    int left = inversePairsCore(copyInput,input,start,start+length);
    int right = inversePairsCore(copyInput,input,start+length+1,end);
    

    int i = start+length;

    int j = end;
    int indexCopy = end;
    int count = 0;
	//两个子数组之间逆序对的计数
    while(i >= start && j >= start+length+1)
    {
        if(input[i] > input[j])
        {
            copyInput[indexCopy--] = input[i--];
            count += (j-start - length);
        }
        else
        {
            copyInput[indexCopy--] = input[j--];
        }
    }
    for(;i >= start;i--)
    {
        copyInput[indexCopy--] = input[i];
    }
    
    for(;j >= start + length + 1;j--)
    {
        copyInput[indexCopy--] = input[j];
    }

    return left+right+count;
	
}
```

## 题目52：两个链表的第一个公共节点

> 题目：输入两个链表，找出它们的第一个公共节点。链表的定义如下：
>
> ```C++
> struct listNode
> {
>     int m_key;
>     listNode* m_pNext;
> };
> ```

思路：如果第一个链表的长度为m，第二个链表的长度为n，暴力解法的时间复杂度为$O(mn)$。

两个单向链表有公共节点，它们的尾节点肯定是相同节点，需要从后向前遍历寻找，可以利用栈来实现单向链表的从后向前遍历。但是用栈也会浪费空间复杂度，可以记录两者的长度，较长的一端就可以先走，以保证两个链表会同时遍历到尾节点。

解法：
```C++
listNode* findFirstCommonNode(listNode* pHead1,listNode* pHead2)
{
    int length1 = getListLength(pHead1);
    int length2 = getListLength(pHead2);
    if(length1 > length2)
    {
        lengthDif = length1 - length2;
        listNode* listNodeLong = pHead1;
        listNode* listNodeShort = pHead2;
    }
    else
    {
        lengthDif = length2 - length1;
        listNode* listNodeLong = pHead2;
        listNode* listNodeShort = pHead1;     
    }
    
    for(int i = 0 ;i < lengthDif;1++)
        listNodeLong = listNodeLong->m_pNext;
    while(listNodeLong != nullptr &&
         listNodeShort != nullptr &&
         listNodeLong != listNodeShort)
    {
        listNodeLong = listNodeLong->m_pNext;
        listNodeShort = listNodeShort->m_pNext;
    }
    listNode* firstCommonNode = listNodeLong;
    return firstCommonNode;
    
}

unsigned int getListLength(listNode* pHead)
{
    int length = 0;    
    while(pHead == nullptr)
    {
        length ++;
        pHead = pHead->m_pNext;        
    }
    return length;
}
```

## 题目53：在排序数组中查找数字

> 题目一：统计数字在排序数组中出现的次数。例如，输入排序数组{1,2,3,3,3,3,4,5}和数字3，由于3在这个数组中出现了4次，因此输出4。

思路：二分法查找，和普通二分法的区别在于需要找到目标出现的第一次和最后一次的位置。

解法：

```C++
int getNumber(vector<int> &input,int target)
{
    int length = input.size();
    int result = -1;
    int first = -1;
    int last = -1;
    //寻找第一次出现的
    int left = 0;
    int right = length - 1;
    int middle = 0;
    while(left <= right)
    {
        middle = (left+right)/2;
        if(input[middle] == target)
        {
			if(middle > 0 && input[middle-1] != target 
			  || middle == 0)
			  {first = middle;break;}
			else
				right = middle - 1;
        }
        else if(input[middle] > target)
            right = middle - 1;
        else
            left = middle + 1;       
    }
    //最后一次出现的
    left = 0;
    right = length - 1;
    while(left <= right)
    {
        middle = (left+right)/2;
        if(input[middle] == target)
        {
			if(middle > 0 && input[middle+1] != target 
			  || middle == 0)
				{last = middle;break;}
			else
				left = middle + 1;
        }
        else if(input[middle] > target)
            right = middle - 1;
        else
            left = middle + 1;       
    }
    cout<<"first: "<<first<<"last: "<<last<<endl;
    if(first > 0 && last > 0)
        result = last - first + 1;
    return result;
}
```

> 题目二：0~n-1中缺失的数字，一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0~n-1之内。在范围0~n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。

思路：简单想法是求出0~n-1的数字之和$s1$（通过公式$n(n-1)/2$计算得出），然后计算出数组中数字之和$s2$，缺失的数字即$s2-s1$。时间复杂度为$O(n)$。

利用二分法，在数组中找到第一个值不等于序列的位置。

解法：

```C++
int getMissNumber(vector<int> &input)
{
    int length = input.size();
    if(length < 1)return -1;
    
    int result = -1;
    int left = 0;
    int right = length - 1;
    while(left <= right)
    {
        int middle = (left + right)/2;
        if(input[middle] != middle)
        {
			if(middle > 0 && input[middle-1] == middle-1 
			  || middle == 0)
				{result = middle;break;}
			else
				right = middle - 1;
        }
        else
            left = middle + 1; 
		//缺少的是最后一个数的可能
		if(left == length) result = length;
    }
    return result;
}
```

> 题目三：数组中数值和下标相等的元素，假设一个单调递增的数组里的每个元素都是整数并且是唯一的。实现一个函数，找出数组中任意一个数值等于其下表的元素。例如，在数组{-3,-1,1,3,5}中，数字3和它的下标相等。

思路：还是二分法，区别在于判断条件的变化（没啥好说的了）。

解法：

```C++
int getNumberSameAsIndex(vector<int> &input)
{
    int length = input.size();
    if(length < 1)return -1;
    
    int result = -1;
    int left = 0;
    int right = length - 1;
    while(left <= right)
    {
        int middle = (left + right)/2;
        if(input[middle] == middle)
			{result = middle;break;}
        else if (input[middle] < middle)
            left = middle + 1; 
        else 
            right = middle - 1;         
    }
    return result;
}
```

## 面试题54：二叉搜索树的第k大节点

> 题目：给定一棵二叉搜索树，找出其中第k大的节点。

思路：二叉搜索树的中序遍历的结果就是递增排序的结果。

解法：

```C++
binaryTreeNode* getKthNode(binaryTreeNode* pRoot,unsigned int k)
{
    if(pRoot == nullptr || k == 0)
        return nullptr;
    return getKthNodeCore(pRoot,k);    
}
binaryTreeNode* getKthNodeCore(binaryTreeNode* pRoot,unsigned int &k)
{
    binaryTreeNode* target == nullptr;
    
    if(pRoot->m_pLeft != nullptr)
        target = getKthNodeCore(pRoot->m_pLeft,k);
    
    if(target == nullptr)
    {
        if(k == 1)
            target = pRoot;        
        k--;
    }
    
    if(target == nullptr && pRoot->m_pRight != nullptr)
        target = getKthNodeCore(pRoot->m_pRight,k);
    
    return target;        
}
```

## 面试题55：二叉树的深度

> 题目一：二叉树的深度，输入一棵二叉的根节点，求该树的深度。从根节点到叶节点依次经过的节点形成树的一条路径，最长路径为树的深度。

思路：如果一个节点只有左子树，那么深度就是左子树的深度+1，如果只有右子树，那么深度就是右子树的深度+1。

解法：

```C++
int getTreeDepth(binaryTreeNode* pRoot)
{
    if(pRoot == nullptr)
        return 0;
    int left = getTreeDepth(pRoot->m_pLeft);
    int right = getTreeDepth(pRoot->m_pRight);
    
    return left > right? (left+1) : (right+1); 
}
```

> 题目二：平衡二叉树，输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果左右节点的深度相差不大于1，就是平衡二叉树。

思路：暴力解法是遍历二叉树的每个节点，计算出左右节点的深度，判断深度相差是否大于1。但这种方法会重复遍历一个节点。

如果用后序遍历，就可以先遍历左右节点，记录下它的深度之后，一边遍历一边判断是否平衡。

解法：

```C++
bool isBalancedCore(binaryTreeNode* pRoot,int &depth)
{
    if(pRoot == nullptr)
    {
        depth = 0;
        return true;
    }
    
    int left,right;
    if( isBalancedCore(pRoot->m_pLeft,left) && isBalancedCore(pRoot->m_pRight,right) )
    {
        int diff = left - right;
        if(abs(diff) <= 1)
        {
            //返回整体二叉树深度的
            depth = 1 + (left > right?lefft:right);
            return true;
        }
    }
    return false;
}

bool isBalanced(binaryTreeNode* pRoot)
{
    int depth = 0;
    return isBalancedCore(pRoot,depth);
}

```

## 面试题56：数组中数字出现的次数

> 题目一：数组中只出现一次的两个数字，一个整型数组里除两个数字外，其他数字都出现了两次。请找出这两个只出现一次的数字。要求时间复杂度是$O(n)$，空间复杂度是$O(1)$。例如在数组{2,4,3,6,3,2,5,5}中出现一次的数字是4，6。

思路：先把题目分割成数组只出现一次的一个数字，题目中的关键词是其他数字都出现两次，这里和异或的性质相匹配（任何一个数字和自己的异或都为0），如果将数组中所有的数字依次异或，那么留下来的就是只出现一次的数字。

再回到出现一次的两个数字的情况，如果还是依次异或的话，最后留下的是这两个数字异或的结果，其中可以依据结果中出现1的第n位将两个数字区分开来，就将第n位是否为1作为评断标准把数组分为两组，就可以把问题分解成两个上面的小问题。

解法：

```C++
bool isBit1(int num,unsigned int indexBit)
{
    num = num >>indexBit;
    return (num & 1);
}

unsigned int findFirstBits1(int num)
{
    int indexBit = 0;
    while((num & 1) == 0 && indexBit < 8*sizeof(int))
    {
        num = num >> 1;
        indexBit ++;
    }
    return indexBit;
}

void findNumberAppearOnce(vector<int> &input,vector<int> &output)
{
    int length = input.size();
    if(length < 2)return;
    int tmp = 0;
    for(int i = 0; i < length;i++)
    {
        tmp ^= input[i];
    }
    
    unsigned int indexBit = findFirstBits1(tmp);
    
    int result1 = 0;
	int result2 = 0;
    for(int i = 0; i < length;i++)
    {
        if(isBit1(input[i],indexBit))
        	result1 ^= input[i];
        else            
        	result2 ^= input[i];
    }
    output.push_back(result1);
    output.push_back(result2);       
}

```

> 题目二：数组中唯一出现一次的数字，在一个数组中除了一个数字只出现一次之外，其他数字都出现了三次。请找出只出现一次的数字。

思路：关键在于其他数字出现三次，同样是沿用位运算的思路，如果一个数字出现三次，那么他的二进制的每一位数加起来都能被3整除。那么把所有数组中的数加起来计算，没有被3整除的那一位就是只出现一次数字的为1的位数。

解法：

```C++
//设int有32位
int findNumberAppearTriple(vector<int> &input)
{
    int length = input.size();    
    if(length < 1) throw runtime_error("Invalid Parameters."); 
    
    int bitSum[32] = {0};
    for(int i = 0;i < length;i++)
    {
        int bitMask = 1;
        for(int j = 31;j >= 0;j--)
        {
            int bit = input[i] & bitMask;
            bitSum[j] += bit;
            bitMask = bitMask << 1;
        }
    }
    int result = 0;
    for(int i = 0; i < 32;i++)
    {
        result = result<<1;
		cout<<endl<<" :"<<result;
        result += bitSum[i]%3;
    }
    return result;
}
```

## 面试题57：和为s的数字

> 题目一：和为s的两个数字，输入一个递增排序的数组和一个数字s，在数组中查找两个数，使得他们的和正好是s。如果有多对数字的和等于s，则输出任意一堆即可。

思路：暴力解法的时间复杂度为$O(n^2)$。

定义两个指针，一个指向头部，一个指向尾部。计算他们的和，当和小于目标时，第一个指针向后移动；当和大于目标时，第二个指针向前移动。

解法：

```C++
bool findNumbersWithSum(vector<int> &input,vector<int> &output,int target)
{
    bool result = false;
    int length = input.size();
    if(length < 1)return false;
    
    int left = 0;
    int right = length - 1;
    
    while(left < right)
    {
        long long sum = input[left] + input[right];
        if(sum == target)
        {
            output.push_back(input[left]);
            output.push_back(input[right]);
            result = true;
            break;
        }
        else if(sum < target)
            left ++;
        else 
            right --;
    }
    return result;
}
```

> 题目二：和为s的连续正数序列，输入一个正数，打印出所有和为s的连续正数序列（至少含有两个数）。例如输入15，由于$1+2+3+4+5=4+5+6=7+8=15$，所以打印出3个连续序列1~5，4~6和7~8。

思路：沿用前面问题的思想，用两个数来表示序列的最小值和最大值。首先将两者初始化为1，2。如果序列的和大于目标数，则增大最小值；如果序列的和小于目标数，则增大最大值；如果等于目标值，则增大最大值并继续遍历直到遍历结束（最小值大于目标值的一半）。

解法：

```C++
void findContinuousSequence(int sum)
{
    if(sum < 3)
        return;
    int left = 1;
    int right = 2;
    int middle = (1+sum)/2;
    int curSum = left + right;
    
    while(left < middle)
    {
        if(curSum == sum)
           printContinuousSequence(left,right);            
 
        //序列和大于目标数的情况
        while(curSum > sum && left < middle)
        {
            curSum -= left;
            left ++;
            
            if(curSum == sum)
                printContinuousSequence(left,right);
        }
        //序列和小于目标数或者等于目标的情况
        right ++;
        curSum += right;
    }
}

void printContinuousSequence(int left,int right)
{
    for(int i = left;i <= right;i++)
    {
        cout<<i<<',';
    }
    cout<<endl;
}
```

## 面试题58：翻转字符串

> 题目一：翻转单词顺序，输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变，标点符号和普通字母一样处理。例如，输入字符串"I am a student."，则输出"student.a am I"。

思路：第一步翻转句子中所有的字符，比如翻转"I am a student."可以得到".tneduts a ma I"，第二步翻转每个单词中字符的顺序，就得到了"student.a am I"。关键在于实现一个函数来翻转字符串中的一段。

解法：

```C++
void Reverse(char *pBegin,char *pEnd)
{
    if(pBegin == nullptr || pEnd == nullptr)
        return;
        
    while(pBegin < pEnd)
    {
        char tmp = *pBegin;
        *pBegin = *pEnd;
        *pEnd = tmp;
        pBegin++;
        pEnd--;
    }
}

char* reverseSentence(char *pData)
{
    if(pData == nullptr)
        return nullptr;
    
    char *pBegin = pData;
    char *pEnd = pData;
    while(*pEnd != '\0')
        pEnd++;
    pEnd--;
    
    Reverse(pBegin,pEnd);
    
    pBegin = pEnd = pData; 
    while(*pBegin != '\0')
    {
        if(*pBegin == ' ')
        {
            pBegin ++;
            pEnd ++;
        }
        else if(*pEnd == ' ' || *pEnd == '\0')
        {
            Reverse(pBegin,--pEnd);
            pEnd++;
            pBegin = pEnd;
        }
        else
            pEnd++;
       
    }
    return pData;
}
```

> 题目二：左旋转字符串，字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。例如，输入字符串"abcdefg"和数字2，输出"cdefgab"。

思路：以"abcdefg"为例，把它分成两个部分，"ab"和"cdefg"。第一步先分别翻转这两个部分，得到"bagfedc"，第二部翻转整个部分，得到"cdfegab"。
也可以先翻转整个部分，得到"gfedcba"，再翻转两个部分"gfedc"和"ba"，得到"cdefgab"。


解法：

```C++
void Reverse(char *pBegin,char *pEnd)
{
    if(pBegin == nullptr || pEnd == nullptr)
        return;
        
    while(pBegin < pEnd)
    {
        char tmp = *pBegin;
        *pBegin = *pEnd;
        *pEnd = tmp;
        pBegin++;
        pEnd--;
    }
}

char* leftRotateString(char* pData,int n)
{
    if(pData == nullptr)
        return nullptr;    
    int length = static_cast<int>(strlen(pData));
    if(length > 0 && n > 0 && length > n)
    {
        char* pFirstBegin = pData;
        char* pFirstEnd = pData + n - 1;
        char* pSecondBegin = pData + n;
        char* pSecondEnd = pData + length - 1;
        
        Reverse(pFirstBegin,pFirstEnd);
        Reverse(pSecondBegin,pSecondEnd);
        Reverse(pData,pSecondEnd);            
    }
    return pData;
}
```

## 面试题59：队列的最大值

> 题目一：滑动窗口的最大值，给定一个数组和滑动窗口的大小，请找出所有滑动窗口里的最大值。例如，输入数组{2,3,4,2,6,2,5,1}以及滑动窗口的大小3，那么一共存在6个滑动窗口，他们的最大值分别为{4,4,6,6,6,5}。

思路：暴力算法的时间复杂度为$O(nk)$。

一种方法：在面试题30中，实现了一个可以用$O(1)$时间得到最小值的栈，在面试9中，讨论了如何用两个栈实现一个队列。综合两个解决方案，就可以得到在$O(1)$时间内得到最大值的栈，总的时间复杂度就降到了$O(n)$。

另一种方法：并不把滑动窗口的每个数值都存入队列，而是把有可能成为滑动窗口最大值的数值存入一个两端开口的队列(deque)。队列中只储存有可能成为最大值数值的索引下标（为的是知道滑动窗口是否包括现在队列里的数）。

解法：

```C++
vector<int> maxInWindows(const vector<int> &num,unsigned int size)
{
    vector<int> maxInWindows;
    if(num.size() < size && size < 1)
        return maxInWindows;
    //头部放的最大值，尾部放的次最大值
    deque<int> index;
    //初始化滑窗
    for(int i = 0;i < size;i++)
    {
        //当滑入数字比当前次最大值大时，弹出现有最大值
        while(!index.empty() && num[i] >= num[index.back()])
            index.pop_back();
        index.push_back(i);
    }
    
    for(int i = size;i < num.size();i++)
    {
        maxInWindows.push_back(num[index.front()]);
        //当滑入数字比当前次最大值大时，弹出现有最大值
        while(!index.empty() && num[i] >= num[index.back()])
            index.pop_back();
        //当滑窗中最大值不在滑窗包含之内时被弹出
        if(!index.empty() && index.front() <= (int)(i - size))
            index.pop_front();
        
        index.push_back(i);
    }
    maxInWindows.push_back(num[index.front()]);
    
    return maxInWindows;
       
}
```

> 题目二：队列的最大值，定义一个队列并实现函数max得到队列里的最大值，要求函数max，push_back，和pop_front的时间复杂度都是$O(1)$。

思路：和前面类似，滑动窗口可以看出一个队列，上题的解法可以显示带max函数的队列。

解法：

```C++
template<typename T> class queueWithMax
{
public:
    QueueWithMax():currentIndex(0)
    {
        
    }
    void push_back(T number)
    {
        while(!maximums.empty() && number >= maximums.back().number)
            maximums.pop_back();
        InternalData internalData = {number,currentIndex};
        //正常的push_back操作
        data.push_back(internalData);            
        internalData.push_back(internalData);
        currentIndex++;
    }
    void pop_front()
    {
        if(maximums.empty())
            throw new exception("queue is empty.");
        if(maximums.front().index == data.front().index)
            maximums.pop_front;
        data.pop_front();
    }    
    T max() const
    {
        if(maximums.empty())
            throw new exception("queue is empty.");
        return maximums.front().number;
    }
    
    
    
private:
    struct InternalData
    {
        T number;
        int index;
    };
    
    deque<InternalData> data;
    //用来存放最大值的窗口
    deque<InternalData> maximums;
    //用来记录最大值序列，保证在pop操作时，能够正确pop  
    int currentIndex;    
}
```

## 面试题60：n个骰子的点数

> 题目：把n个骰子扔在地上，所有骰子朝上一面的点数之和为s。输入n，打印出s的所有可能的值出现的概率。

思路：n个骰子的点数和最小值为n，最大值为6n，所有点数的排列数为$6^n$。想求出n个骰子的点数和，把n个骰子分为两堆：第一堆只有一个；另一堆有n-1个。单独那一个有可能出现1~6的点数，还需要计算剩余n-1个骰子的点数。如此递归下去直到只剩下一个骰子。
我们用两个数组来存储骰子点数的每个总数出现的次数。在一轮循环中，第一个数组中的第n个数字表示骰子和为n出现的次数。在下一轮循环中，加一个新的骰子，此时和为n的骰子出现的次数，应该等于上一轮循环中骰子点数为n-1、n-2、n-3、n-4、n-5、n-6的总和，所以把另一个数组的第n个数字设为前一个数组第n-1、n-2、n-3、n-4、n-5、n-6个数字之和。

解法：

```C++
void printProbability(int number)
{
    if(number < 1)return;
    
    int* pProbability[2];
    pProbability[0] = new int[g_maxValue*number+1];
    pProbability[1] = new int[g_maxValue*number+1];
    for(int i = 0;i < g_maxValue*number;i++)
    {
        pProbability[0][i] = 0;
        pProbability[1][i] = 0;
    }
    //flag用来切换两个数组的使用
    int flag = 0;
    //初始化第一个数组
    for(int i = 1;i <= g_maxValue;i++)
        pProbability[flag][i] = 1;
    //k代表第几个骰子
    for(int k = 2;k <=number;k++)
    {
        for(int i = 0;i < k;i++)
            pProbability[1-flag][i] = 0;
        
        for(int i = k;i <= g_maxValue*k;i++)
        {
            pProbability[1-flag][i] = 0;
            //这里代表上一轮n-1、n-2、n-3、n-4、n-5、n-6的个数之和
            for(int j = 1;j <= i&& j <= g_maxValue;j++)
                pProbability[1-flag][i] += pProbability[flag][i-j];
        }
        flag = 1 - flag;
    }
    
    //打印几率
    double total = pow((double)g_maxValue,number);
    for(int i = number;i <= g_maxValue*number;i++)
    {
        double ratio = (double)pProbability[flag][i] /total;
        cout<<i<<' '<<ratio<<endl;
    }
    delete[] pProbability[0];
    delete[] pProbability[1];
    
}
```

