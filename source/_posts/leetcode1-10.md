---
title: leetcode刷题1-10
date: 2019-08-19 17:01:00
tags: C++
---
# leetcode刷题1-10

## 1.TwoSum

> Given an array of integers, return **indices** of the two numbers such that they add up to a specific target.
>
> You may assume that each input would have **exactly** one solution, and you may not use the *same* element twice.
>
> **Example:**
>
> ```
> Given nums = [2, 7, 11, 15], target = 9,
> 
> Because nums[0] + nums[1] = 2 + 7 = 9,
> return [0, 1].
> ```

思路：

```C++
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        vector<int> value;
        
        for(int i =0;i < nums.size();i++){
            for(int j = i+1;j < nums.size();j++){
                if (target == (nums[i]+nums[j])){
                    value.push_back(i);
                    value.push_back(j);
                    return value;
                    break;
                }
            }
        }
        
    }
};
```



## 2.Add Two Numbers

> You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order** and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
>
> You may assume the two numbers do not contain any leading zero, except the number 0 itself.
>
> **Example:**
>
> ```
> Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
> Output: 7 -> 0 -> 8
> Explanation: 342 + 465 = 807.
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
    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {
        ListNode result(0);
        ListNode* p = &result;
        int add=0;
        while(l1 != NULL || l2 != NULL || add){
            int x,y;
            if(l1 != NULL) x = l1->val;
            else
                x = 0;
            if(l2 != NULL) y = l2->val;
            else
                y = 0;
                        
            if(x+y+add >= 10){
                p->next = new ListNode(x + y - 10 + add);
                add = 1;
            }
            else{
                p->next = new ListNode(x + y + add);
                add = 0;
            }
            if(l1 != NULL)l1 = l1->next;
            if(l2 != NULL)l2 = l2->next;
            p = p->next;  
        }
        return result.next;
    }
};
```

## 3.Longest Substring Without Repeating Characters

> Given a string, find the length of the **longest substring** without repeating characters.
>
> **Example 1:**
>
> ```
> Input: "abcabcbb"
> Output: 3 
> Explanation: The answer is "abc", with the length of 3. 
> ```
>
> **Example 2:**
>
> ```
> Input: "bbbbb"
> Output: 1
> Explanation: The answer is "b", with the length of 1.
> ```
>
> **Example 3:**
>
> ```
> Input: "pwwkew"
> Output: 3
> Explanation: The answer is "wke", with the length of 3. 
>              Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
> ```

```C++
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int start = -1;
        int len = 0;
        vector<int> a(256,-1);
        for(int i = 0;i < s.length();i++){
            if(a[s[i]]>start){
                start = a[s[i]];
            } 
            a[s[i]] = i;
           len=max(i-start,len);
           }               
        return len;
    }
};           
```

## 4.Median of Two Sorted Arrays

> There are two sorted arrays **nums1** and **nums2** of size m and n respectively.
>
> Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).
>
> You may assume **nums1** and **nums2** cannot be both empty.
>
> **Example 1:**
>
> ```
> nums1 = [1, 3]
> nums2 = [2]
> 
> The median is 2.0
> ```
>
> **Example 2:**
>
> ```
> nums1 = [1, 2]
> nums2 = [3, 4]
> 
> The median is (2 + 3)/2 = 2.5
> ```

```C++
class Solution {
public:
    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {
        if(nums1.size()>nums2.size())nums1.swap(nums2);
        int m = nums1.size(),n = nums2.size();
        int mid = (m+n-1)/2;
        int l = 0,r = m-1;
        while(l <= r){
            int m1 = l+((r-l)>>1) ,m2 = mid - m1;
            if(nums1[m1]<=nums2[m2]) l = m1 + 1;
            else r = m1 -1 ;
        }
        int a = max(0<=r?nums1[r]:INT_MIN,0<=mid-l?nums2[mid-l]:INT_MIN);
        if ((m+n)&1) return a;
        int b = min(l<m?nums1[l]:INT_MAX,mid-r<n?nums2[mid-r]:INT_MAX);
        return (a+b)/2.0;

    }
};
```

## 5.Longest Palindromic Substring

> Given a string **s**, find the longest palindromic substring in **s**. You may assume that the maximum length of **s** is 1000.
>
> **Example 1:**
>
> ```
> Input: "babad"
> Output: "bab"
> Note: "aba" is also a valid answer.
> ```
>
> **Example 2:**
>
> ```
> Input: "cbbd"
> Output: "bb"
> ```

```c++
class Solution {
public:
    string longestPalindrome(string s) {
        
        string t = "$#";
        for(int i = 0 ;i < s.size() ; i++){
            t+=s[i];
            t+="#";
        }
        int maxcenter = -1;
        int maxright = -1;
        int p[t.size()];
        for(int i = 0;i < t.size(); i++){
            p[i] = maxright > i ?min(maxright - i , p[2*maxcenter - i])  : 1;
            while((t[i-p[i]]) == (t[i+p[i]])) p[i]++;
            if(p[i]>maxright-maxcenter){
                maxcenter = i;
                maxright = i + p[i];
            }               
        }
        return s.substr((2*maxcenter - maxright)/2,maxright - maxcenter -1);
        
    }
};
```

## 6.ZigZag Conversion

> The string `"PAYPALISHIRING"` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)
>
> ```
> P   A   H   N
> A P L S I I G
> Y   I   R
> ```
>
> And then read line by line: `"PAHNAPLSIIGYIR"`
>
> Write the code that will take a string and make this conversion given a number of rows:
>
> ```
> string convert(string s, int numRows);
> ```
>
> **Example 1:**
>
> ```
> Input: s = "PAYPALISHIRING", numRows = 3
> Output: "PAHNAPLSIIGYIR"
> ```
>
> **Example 2:**
>
> ```
> Input: s = "PAYPALISHIRING", numRows = 4
> Output: "PINALSIGYAHRPI"
> Explanation:
> 
> P     I    N
> A   L S  I G
> Y A   H R
> P     I
> ```

```C++
class Solution {
public:
    string convert(string s, int numRows) {
        bool direction = false;
        string result;
        vector<string> a(min(numRows,int(s.size())));
        int index = 0;
        if(1 == numRows)return s;
        
        for (char c : s){
            a[index] += c;
            if(index == 0 || index == numRows - 1) direction = !direction;
            index += direction ? 1 : -1;
        }
        
        for(string c : a){
            result += c;
        }
        return result;
    }
};
```

## 7.Reverse Integer

> Given a 32-bit signed integer, reverse digits of an integer.
>
> **Example 1:**
>
> ```
> Input: 123
> Output: 321
> ```
>
> **Example 2:**
>
> ```
> Input: -123
> Output: -321
> ```
>
> **Example 3:**
>
> ```
> Input: 120
> Output: 21
> ```

```C++
class Solution {
public:
    int reverse(int x) {
        long a = 0 ;
        int pop;
        while(x != 0){
            pop = x%10;
            x/=10;
            a = a*10 + pop;
        }
        return (a>INT_MAX || a<INT_MIN)?0:a;
    }
};
```

## 8. String to Integer (atoi)

> Implement `atoi` which converts a string to an integer.
>
> The function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character, takes an optional initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.
>
> The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.
>
> If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.
>
> If no valid conversion could be performed, a zero value is returned.
>
> **Note:**
>
> - Only the space character `' '` is considered as whitespace character.
> - Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−231,  231 − 1]. If the numerical value is out of the range of representable values, INT_MAX (231 − 1) or INT_MIN (−231) is returned.
>
> **Example 1:**
>
> ```
> Input: "42"
> Output: 42
> ```
>
> **Example 2:**
>
> ```
> Input: "   -42"
> Output: -42
> Explanation: The first non-whitespace character is '-', which is the minus sign.
>              Then take as many numerical digits as possible, which gets 42.
> ```
>
> **Example 3:**
>
> ```
> Input: "4193 with words"
> Output: 4193
> Explanation: Conversion stops at digit '3' as the next character is not a numerical digit.
> ```
>
> **Example 4:**
>
> ```
> Input: "words and 987"
> Output: 0
> Explanation: The first non-whitespace character is 'w', which is not a numerical 
>              digit or a +/- sign. Therefore no valid conversion could be performed.
> ```
>
> **Example 5:**
>
> ```
> Input: "-91283472332"
> Output: -2147483648
> Explanation: The number "-91283472332" is out of the range of a 32-bit signed integer.
>              Thefore INT_MIN (−231) is returned.
> ```

```C++
class Solution {
public:
    int myAtoi(string str) {
        int sign = 1;
        int count = 0;
        double result = 0;
        int is_digit = 0;
        for(char c : str){
            count ++;
            if('+' == c && 1 == count){
                sign =1;
                is_digit ++;
            }
            else if('-' == c && 1 == count){
                sign = -1;
                is_digit ++;
            }
            else if(' ' == c && 1 == count){
                count --;
            }
            else if(isdigit(c) && 2 > is_digit)
                result =result*10 + (c-'0');            
            else break;
        }
        if(result > INT_MAX){
            if (1 == sign)return INT_MAX;
            if (-1 == sign)return INT_MIN;
        }else return result*sign;
    }
};
```

## 9. Palindrome Number

> Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.
>
> **Example 1:**
>
> ```
> Input: 121
> Output: true
> ```
>
> **Example 2:**
>
> ```
> Input: -121
> Output: false
> Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.
> ```
>
> **Example 3:**
>
> ```
> Input: 10
> Output: false
> Explanation: Reads 01 from right to left. Therefore it is not a palindrome.
> ```

```C++
class Solution {
public:
    bool isPalindrome(int x) {
        if(x<0 || (0 == x%10 && x!= 0))return 0;
        int reverse=0;
        int y = x;
        while(0 < y){
            reverse = reverse*10 +y%10;
            y/=10;
        }
        return x == reverse;
    }
};
```

## 10. Regular Expression Matching

> Given an input string (`s`) and a pattern (`p`), implement regular expression matching with support for `'.'` and `'*'`.
>
> ```
> '.' Matches any single character.
> '*' Matches zero or more of the preceding element.
> ```
>
> The matching should cover the **entire** input string (not partial).
>
> **Note:**
>
> - `s` could be empty and contains only lowercase letters `a-z`.
> - `p` could be empty and contains only lowercase letters `a-z`, and characters like `.` or `*`.
>
> **Example 1:**
>
> ```
> Input:
> s = "aa"
> p = "a"
> Output: false
> Explanation: "a" does not match the entire string "aa".
> ```
>
> **Example 2:**
>
> ```
> Input:
> s = "aa"
> p = "a*"
> Output: true
> Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".
> ```
>
> **Example 3:**
>
> ```
> Input:
> s = "ab"
> p = ".*"
> Output: true
> Explanation: ".*" means "zero or more (*) of any character (.)".
> ```
>
> **Example 4:**
>
> ```
> Input:
> s = "aab"
> p = "c*a*b"
> Output: true
> Explanation: c can be repeated 0 times, a can be repeated 1 time. Therefore, it matches "aab".
> ```
>
> **Example 5:**
>
> ```
> Input:
> s = "mississippi"
> p = "mis*is*p*."
> Output: false
> ```

```C++
class Solution {
public:
    bool isMatch(string s, string p) {
        if('*' == p[0])return false;
        int m = s.length();
        int n = p.length();
        bool dp[m+1][n+1] {{false}};
        dp[0][0] = true;
        for(int i = 0;i <= m ; i++){
            for(int j = 1; j<=n ; j++){
                if('*' == p[j-1]){
                    dp[i][j] = dp[i][j-2] || (i > 0 && (s[i - 1] == p[j - 2] || p[j - 2] == '.') && dp[i - 1][j]);
                }
                else dp[i][j] = i > 0 && dp[i - 1][j - 1] && (s[i - 1] == p[j - 1] || p[j - 1] == '.');
            }
            
        }
        return dp[m][n];
    }
};
```

