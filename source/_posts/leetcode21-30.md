---
title: leetcode刷题21-30
date: 2019-08-19 17:01:00
tags: C++
---
# leetcod刷题21-30

## 21. Merge Two Sorted Lists

> Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.
>
> **Example:**
>
> ```
> Input: 1->2->4, 1->3->4
> Output: 1->1->2->3->4->4
> ```

```C++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {
        ListNode* result = new ListNode(0);
        ListNode* p = result;
        while(NULL != l1 || NULL != l2){
            if(l2 == NULL){
                result->next = new ListNode(l1->val);
                if(l1 !=NULL)l1 = l1->next;
            }else if(l1 == NULL){
                result->next = new ListNode(l2->val);
                if(l2 !=NULL)l2 = l2->next;                
            }else if(l1->val <= l2->val){
                result->next = new ListNode(l1->val);
                if(l1 !=NULL)l1 = l1->next;                
            }else if(l1->val >= l2->val){
                result->next = new ListNode(l2->val);
                if(l2 !=NULL)l2 = l2->next;                
            }
            
/*            if(l1->val <= l2->val && NULL != l1){
                cout<<l1->val<<endl;
                result->next = new ListNode(l1->val);
                if(l1 !=NULL)l1 = l1->next;
            }
            if(l1 == NULL || l1->val >= l2->val && NULL != l2){
                cout<<l2->val<<endl;
                result->next = new ListNode(l2->val);
                if(l2 !=NULL)l2 = l2->next;
            }*/
            result = result->next;
            
        }
        return p->next;
        
    }
};
```

## 22. Generate Parentheses

> Given *n* pairs of parentheses, write a function to generate all combinations of well-formed parentheses.
>
> For example, given *n* = 3, a solution set is:
>
> ```
> [
>   "((()))",
>   "(()())",
>   "(())()",
>   "()(())",
>   "()()()"
> ]
> ```

```C++
class Solution {
public:
    void addpair(vector<string> &v,string tmp , int left , int right){
        if(0 == left && 0 == right){
            v.push_back(tmp);
            return;        
        }
        if(right > 0)addpair(v,tmp+")",left,right-1);
        if(left > 0)addpair(v,tmp+"(",left-1,right+1);
    }
    
    vector<string> generateParenthesis(int n) {
        vector<string> result;
        string tmp;
        addpair(result,tmp,n,0);
        return result;        
    }
};
```

## 23. Merge k Sorted Lists

> Merge *k* sorted linked lists and return it as one sorted list. Analyze and describe its complexity.
>
> **Example:**
>
> ```
> Input:
> [
>   1->4->5,
>   1->3->4,
>   2->6
> ]
> Output: 1->1->2->3->4->4->5->6
> ```

```C++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        int k = (int)lists.size();
        if(k==0) return NULL;
        if(k==1) return lists[0];
        ListNode* result = new ListNode(INT_MIN);
        result->next = lists[0];
        ListNode* p = result;
        ListNode* ptr;
        for( int i = 1 ; i< k ; i++){
            p = result;
            while( lists[i] ){
                
                if(p->next == NULL){
                    ptr = p->next;
                    p->next = new ListNode(lists[i]->val);
                    p->next->next = ptr;
                    p = p->next;
                    //cout<<"first"<<endl;
                    lists[i] = lists[i]->next;
                }
                else if(p->val <= lists[i]->val && lists[i]->val <= p->next->val){     
                    ptr = p->next;
                    p->next = new ListNode(lists[i]->val);
                    p->next->next = ptr;
                    p = p->next;
                    //cout<<"second"<<lists[i]->val<<endl;
                    lists[i] = lists[i]->next;                    
                }else if(p!=NULL){
                    //cout<<"ok"<<endl;
                    //cout<<p->val<<endl;
                    p = p->next;
                }                
            }
                        
        }
        return result->next;
   
    }
};
```

## 24. Swap Nodes in Pairs

> Given a linked list, swap every two adjacent nodes and return its head.
>
> You may **not** modify the values in the list's nodes, only nodes itself may be changed.
>
>  
>
> **Example:**
>
> ```
> Given 1->2->3->4, you should return the list as 2->1->4->3.
> ```

```C++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* swapPairs(ListNode* head) {
        ListNode* ptr = new ListNode(0);
        ptr->next = head;
        ListNode* result = new ListNode(0);
        if(head == NULL || head->next == NULL)return head;
        else result->next = head->next;
        while(head != NULL){
            if(head->next == NULL)return result->next;
            else {
                ptr->next = head->next;
                head->next = ptr->next->next;
                ptr->next->next = head;                
            }
            ptr = ptr->next->next;
            head = ptr->next; 
            //cout<<ptr->val<<endl;
        }
        
        return result->next;
        
    }
};
```

## 25. Reverse Nodes in k-Group

> Given a linked list, reverse the nodes of a linked list *k* at a time and return its modified list.
>
> *k* is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of *k* then left-out nodes in the end should remain as it is.
>
> 
>
> **Example:**
>
> Given this linked list: `1->2->3->4->5`
>
> For *k* = 2, you should return: `2->1->4->3->5`
>
> For *k* = 3, you should return: `3->2->1->4->5`
>
> **Note:**
>
> - Only constant extra memory is allowed.
> - You may not alter the values in the list's nodes, only nodes itself may be changed.

```C++
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* reverseKGroup(ListNode* head, int k) {
        if(head == NULL || 1 == k)return head;
        ListNode* result = new ListNode(0);
        result->next = head;
        ListNode* cur = result;
        ListNode* nex ;
        ListNode* pre = result;
        int num = 0;
        
        while(cur= cur->next)
            num++;
        while(num >= k){
            cur = pre->next;
            nex = cur->next;
            for(int i = 1 ; i < k ; i++){//就是每次吧nex节点插到pre后面
                cur->next = nex->next;
                nex->next = pre->next;
                pre->next = nex;
                nex = cur->next;
            }
            pre = cur; 
            num -= k;
        }
        return result->next;
    }
};
```

## 26. Remove Duplicates from Sorted Array

> Given a sorted array *nums*, remove the duplicates [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm) such that each element appear only *once* and return the new length.
>
> Do not allocate extra space for another array, you must do this by **modifying the input array in-place** with O(1) extra memory.
>
> **Example 1:**
>
> ```
> Given nums = [1,1,2],
> 
> Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively.
> 
> It doesn't matter what you leave beyond the returned length.
> ```
>
> **Example 2:**
>
> ```
> Given nums = [0,0,1,1,1,2,2,3,3,4],
> 
> Your function should return length = 5, with the first five elements of nums being modified to 0, 1, 2, 3, and 4 respectively.
> 
> It doesn't matter what values are set beyond the returned length.
> ```

```C++
class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        if(nums.size() == 0)return 0;
        int tmp = nums[0];
        int result = 1;
        for(vector<int>::iterator it = nums.begin()+1; it != nums.end() ; ){
            if(*it == tmp){
                it = nums.erase(it);
            }
            else {
                tmp = *it;
                it++;
                result++;
            }
        }
        return result;
    }
};
```

## 27. Remove Element

> Given an array *nums* and a value *val*, remove all instances of that value [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm) and return the new length.
>
> Do not allocate extra space for another array, you must do this by **modifying the input array in-place** with O(1) extra memory.
>
> The order of elements can be changed. It doesn't matter what you leave beyond the new length.
>
> **Example 1:**
>
> ```
> Given nums = [3,2,2,3], val = 3,
> 
> Your function should return length = 2, with the first two elements of nums being 2.
> 
> It doesn't matter what you leave beyond the returned length.
> ```
>
> **Example 2:**
>
> ```
> Given nums = [0,1,2,2,3,0,4,2], val = 2,
> 
> Your function should return length = 5, with the first five elements of nums containing 0, 1, 3, 0, and 4.
> 
> Note that the order of those five elements can be arbitrary.
> 
> It doesn't matter what values are set beyond the returned length.
> ```

```C++
class Solution {
public:
    int removeElement(vector<int>& nums, int val) {
        if(nums.size() == 0)return 0;
        int result = 0;
        for(vector<int>::iterator it = nums.begin(); it != nums.end() ; ){
            if(*it == val){
                it = nums.erase(it);
            }
            else {
                it++;
                result++;
            }
        }
        return result;
    }
};
```

## 28. Implement strStr()

> Implement [strStr()](http://www.cplusplus.com/reference/cstring/strstr/).
>
> Return the index of the first occurrence of needle in haystack, or **-1** if needle is not part of haystack.
>
> **Example 1:**
>
> ```
> Input: haystack = "hello", needle = "ll"
> Output: 2
> ```
>
> **Example 2:**
>
> ```
> Input: haystack = "aaaaa", needle = "bba"
> Output: -1
> ```
>
> **Clarification:**
>
> What should we return when `needle` is an empty string? This is a great question to ask during an interview.
>
> For the purpose of this problem, we will return 0 when `needle` is an empty string. This is consistent to C's [strstr()](http://www.cplusplus.com/reference/cstring/strstr/) and Java's [indexOf()](https://docs.oracle.com/javase/7/docs/api/java/lang/String.html#indexOf(java.lang.String)).

```C++
class Solution {
public:
    int strStr(string haystack, string needle) {
        int m = haystack.length();
        int n = needle.length();
        if(n == 0)return 0;
        vector<int> lps = kmpProcess(needle);
        for(int i = 0 ,j = 0; i < m  ; ){
            if(haystack[i] == needle[j]){
                i++;
                j++;
            }
            if(j == n )return i-j;
            if(i<m && haystack[i] != needle[j]){
                if(j) j = lps[j-1];
                else i++;
            }
        }
        return -1;      
    }
private:
    vector<int> kmpProcess(string needle){
        int n = needle.length();
        vector<int> lps(n, 0);
        for (int i = 1, len = 0; i < n; ) {
            if (needle[i] == needle[len]) {
                lps[i++] = ++len;
            } else if (len) {
                len = lps[len - 1];
            } else {
                lps[i++] = 0;
            }
        }
        return lps;        
    }
};
```

##  29. Divide Two Integers

> Given two integers `dividend` and `divisor`, divide two integers without using multiplication, division and mod operator.
>
> Return the quotient after dividing `dividend` by `divisor`.
>
> The integer division should truncate toward zero.
>
> **Example 1:**
>
> ```
> Input: dividend = 10, divisor = 3
> Output: 3
> ```
>
> **Example 2:**
>
> ```
> Input: dividend = 7, divisor = -3
> Output: -2
> ```
>
> **Note:**
>
> - Both dividend and divisor will be 32-bit signed integers.
> - The divisor will never be 0.
> - Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. For the purpose of this problem, assume that your function returns 231 − 1 when the division result overflows.

```C++
class Solution {
public:
    int divide(int dividend, int divisor) {
        if (!divisor || (dividend == INT_MIN && divisor == -1))
            return INT_MAX;        
        int sign = (divisor>0)^(dividend>0)?-1:1;
        int result = 0;
        long long dvd = labs(dividend);
        long long dvs = labs(divisor);
        while(dvd >= dvs){
            long long tmp = dvs , multiple = 1;
            while(dvd >= (tmp<<1)){
                tmp<<=1;
                multiple<<=1;
            }
            dvd -= tmp;
            result += multiple;            
        }
        result = sign == -1?-result:result;
        return result;
 
    }
};
```

## 30. Substring with Concatenation of All Words

> You are given a string, **s**, and a list of words, **words**, that are all of the same length. Find all starting indices of substring(s) in **s** that is a concatenation of each word in **words** exactly once and without any intervening characters.
>
> **Example 1:**
>
> ```
> Input:
>   s = "barfoothefoobarman",
>   words = ["foo","bar"]
> Output: [0,9]
> Explanation: Substrings starting at index 0 and 9 are "barfoor" and "foobar" respectively.
> The output order does not matter, returning [9,0] is fine too.
> ```
>
> **Example 2:**
>
> ```
> Input:
>   s = "wordgoodgoodgoodbestword",
>   words = ["word","good","best","word"]
> Output: []
> ```

```C++
class Solution {
public:
    vector<int> findSubstring(string s, vector<string>& words) {
        vector<int> ans;
        int n = s.size(), cnt = words.size();
        if (n <= 0 || cnt <= 0) return ans;
        
        // init word occurence
        unordered_map<string, int> dict;
        for (int i = 0; i < cnt; ++i) dict[words[i]]++;//对子字符串初始化映射
        
        // travel all sub string combinations
        int wl = words[0].size();
        for (int i = 0; i < wl; ++i) {
            int left = i, count = 0;    //count代表检测到的子字符串的数量
            unordered_map<string, int> tdict;
            for (int j = i; j <= n - wl; j += wl) {
                string str = s.substr(j, wl);   //从左向右遍历
                // a valid word, accumulate results
                if (dict.count(str)) {  //找到对应的子字符串
                    tdict[str]++;   //对应位置 置1
                    if (tdict[str] <= dict[str])    //如果没有出现重复子字符串
                        count++;    //将计数+1
                    else {
                        // a more word, advance the window left side possiablly
                        while (tdict[str] > dict[str]) {    //如果出现重复子字符串
                            string str1 = s.substr(left, wl);
                            tdict[str1]--;
                            if (tdict[str1] < dict[str1]) count--;
                            left += wl;
                        }
                    }
                    // come to a result
                    if (count == cnt) {     //子字符串全部出现一次后
                        ans.push_back(left);
                        // advance one word
                        tdict[s.substr(left, wl)]--;    //这里没有全部置0的原因是可能下一个字符串还有可能匹配， 
                        count--;
                        left += wl;
                    }
                }
                // not a valid word, reset all vars
                else {
                    tdict.clear();
                    count = 0;
                    left = j + wl;
                }
            }
        }
        
        return ans;        
        
    }
};
```

