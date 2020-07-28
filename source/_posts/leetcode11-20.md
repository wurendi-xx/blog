---
title: leetcode刷题11-20
date: 2019-08-19 17:01:00
tags: C++
---
# leetcode刷题11-20

## 11. Container With Most Water

> Given *n* non-negative integers *a1*, *a2*, ..., *an* , where each represents a point at coordinate (*i*, *ai*). *n* vertical lines are drawn such that the two endpoints of line *i* is at (*i*, *ai*) and (*i*, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.
>
> **Note:** You may not slant the container and *n* is at least 2.
>
>  
>
> ![img](https://s3-lc-upload.s3.amazonaws.com/uploads/2018/07/17/question_11.jpg)
>
> The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.
>
>  
>
> **Example:**
>
> ```
> Input: [1,8,6,2,5,4,8,3,7]
> Output: 49
> ```

```C++
class Solution {
public:
    int maxArea(vector<int>& height) {
        int m = height.size();
        int rect = 0;
        for (int i = 0; i<m ; i++){
            for (int j = i+1; j<m ; j++){
                rect = max(rect,min(height[j],height[i])*(j-i));
            }
        }
        return rect;
    }
};
```

## 12. Integer to Roman

> Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.
>
> ```
> Symbol       Value
> I             1
> V             5
> X             10
> L             50
> C             100
> D             500
> M             1000
> ```
>
> For example, two is written as `II` in Roman numeral, just two one's added together. Twelve is written as, `XII`, which is simply `X` + `II`. The number twenty seven is written as `XXVII`, which is `XX` + `V` + `II`.
>
> Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:
>
> - `I` can be placed before `V` (5) and `X` (10) to make 4 and 9. 
> - `X` can be placed before `L` (50) and `C` (100) to make 40 and 90. 
> - `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.
>
> Given an integer, convert it to a roman numeral. Input is guaranteed to be within the range from 1 to 3999.
>
> **Example 1:**
>
> ```
> Input: 3
> Output: "III"
> ```
>
> **Example 2:**
>
> ```
> Input: 4
> Output: "IV"
> ```
>
> **Example 3:**
>
> ```
> Input: 9
> Output: "IX"
> ```
>
> **Example 4:**
>
> ```
> Input: 58
> Output: "LVIII"
> Explanation: L = 50, V = 5, III = 3.
> ```
>
> **Example 5:**
>
> ```
> Input: 1994
> Output: "MCMXCIV"
> Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
> ```

```C++
class Solution {
public:
    string roman(int tmp,string one,string five,string ten){
        switch(tmp){
            case 0:return "";break;
            case 1:return one;break;
            case 2:return one+one;break;
            case 3:return one+one+one;break;
            case 4:return one+five;break;
            case 5:return five;break;
            case 6:return five+one;break;
            case 7:return five+one+one;break;
            case 8:return five+one+one+one;break;
            case 9:return one+ten;break;
            default:return "";
        }
    }
    string intToRoman(int num) {
        int carry = 0;
        string result;
        while(num > 0){
            int tmp = num%10;
            switch(carry){
                case 0:result = roman(tmp,"I","V","X") + result;break;
                case 1:result = roman(tmp,"X","L","C") + result;break;
                case 2:result = roman(tmp,"C","D","M") + result;break;
                case 3:result = roman(tmp,"M","","") + result;break;
            }
            num /=10;
            carry ++;
        }
        return result;
    }
};
```

## 13. Roman to Integer

> Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.
>
> ```
> Symbol       Value
> I             1
> V             5
> X             10
> L             50
> C             100
> D             500
> M             1000
> ```
>
> For example, two is written as `II` in Roman numeral, just two one's added together. Twelve is written as, `XII`, which is simply `X` + `II`. The number twenty seven is written as `XXVII`, which is `XX` + `V` + `II`.
>
> Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:
>
> - `I` can be placed before `V` (5) and `X` (10) to make 4 and 9. 
> - `X` can be placed before `L` (50) and `C` (100) to make 40 and 90. 
> - `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.
>
> Given a roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.
>
> **Example 1:**
>
> ```
> Input: "III"
> Output: 3
> ```
>
> **Example 2:**
>
> ```
> Input: "IV"
> Output: 4
> ```
>
> **Example 3:**
>
> ```
> Input: "IX"
> Output: 9
> ```
>
> **Example 4:**
>
> ```
> Input: "LVIII"
> Output: 58
> Explanation: L = 50, V= 5, III = 3.
> ```
>
> **Example 5:**
>
> ```
> Input: "MCMXCIV"
> Output: 1994
> Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.
> ```

```C++
class Solution {
public:
    int romanToInt(string s) {
        int result = 0;
        for(int i = 0;i < s.size() ;i++){
            if('M' == s[i] )result +=1000;                
            else if('C' == s[i] &&  ('D' == s[i+1] || 'M' == s[i+1]))result -= 100;
            else if('X' == s[i] &&  ('L' == s[i+1] || 'C' == s[i+1]))result -= 10;
            else if('I' == s[i] &&  ('V' == s[i+1] || 'X' == s[i+1]))result -= 1;
            else if('D' == s[i] )result += 500;
            else if('C' == s[i] )result += 100;
            else if('L' == s[i] )result += 50;
            else if('X' == s[i] )result += 10;
            else if('V' == s[i] )result += 5;
            else if('I' == s[i] )result += 1;
            else ;
        }
        return result;
    }
};
```

## 14. Longest Common Prefix

> Write a function to find the longest common prefix string amongst an array of strings.
>
> If there is no common prefix, return an empty string `""`.
>
> **Example 1:**
>
> ```
> Input: ["flower","flow","flight"]
> Output: "fl"
> ```
>
> **Example 2:**
>
> ```
> Input: ["dog","racecar","car"]
> Output: ""
> Explanation: There is no common prefix among the input strings.
> ```

```C++
class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        string result;
        result = strs.size() ? strs[0] : "";
        for (int i = 1; i <strs.size() ; i++){
            int j = 0;
            for (j = 0 ; j<strs[i].size(); j++){
                if( result[j] != strs[i][j]){
                    result = result.substr(0,j);
                    break;
                }
            }
             result = result.substr(0,j);
        }
        return result;
    }
    
};
```

## 15. 3Sum

> Given an array `nums` of *n* integers, are there elements *a*, *b*, *c* in `nums` such that *a* + *b*+ *c* = 0? Find all unique triplets in the array which gives the sum of zero.
>
> **Note:**
>
> The solution set must not contain duplicate triplets.
>
> **Example:**
>
> ```
> Given array nums = [-1, 0, 1, 2, -1, -4],
> 
> A solution set is:
> [
>   [-1, 0, 1],
>   [-1, -1, 2]
> ]
> ```

```C++
class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        vector<vector<int>> result;
        int n = nums.size();
        if( 3 > n) return result;
        int first = 0 ;
        sort (nums.begin(),nums.end());
        
        for(int i = 0 ; i < n-2 ; i++){
            if(i > 0 && nums[i] == nums[i-1])
                continue;
            if(nums[i]+nums[i+1]+nums[i+2]>0)break;
            if(nums[i]+nums[n-1]+nums[n-2]<0)continue;
            first = nums[i];
            int left = i + 1;
            int right = n - 1;
            while (left < right){
                int sum = nums[left]+nums[right];
                if (sum == -first) {
                    vector<int> tmp ={first,nums[left],nums[right]};
                    result.push_back(tmp);
                    
                    int k = left + 1;
                    while(k < right && nums[k] == nums[left])k++;
                    left = k;

                    k= right - 1;
                    while(k > left && nums[k] == nums[right])k--;
                    right = k;
                }
                else if (sum < -first) left++;
                else right--;
                

                }
            
        }
        //unique(result.begin(), result.end());
        //result.erase(unique(result.begin(), result.end()), result.end());
        return result;
        
    }
};
```

## 16. 3Sum Closest

> Given an array `nums` of *n* integers and an integer `target`, find three integers in `nums` such that the sum is closest to `target`. Return the sum of the three integers. You may assume that each input would have exactly one solution.
>
> **Example:**
>
> ```
> Given array nums = [-1, 2, 1, -4], and target = 1.
> 
> The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).
> ```

```C++
class Solution {
public:
    int threeSumClosest(vector<int>& nums, int target) {
        int n = nums.size();
        if (3 > n)return 0;
        int result = nums[0]+nums[1]+nums[2];
        int diff = abs(result - target);
        sort(nums.begin(),nums.end());
        for ( int i = 0; i < n-2 ; i++){
            //if(i > 0 && nums[i] == nums[i-1])continue;
            int first = nums[i];
            int left = i + 1;
            int right = n - 1;
            while(left < right){
                int sum = first + nums[left] + nums[right];
                if(abs(sum - target)<diff){
                    result = sum;
                    diff = abs(sum - target);
                    //cout<<first<<'?'<<nums[left]<<'?'<<nums[right]<<'?'<<sum<<endl;
                    //while(nums[left] == nums[left+1])left ++;
                    //while(nums[right] == nums[right-1])right --;
                }
                else if (sum < target)left ++;
                else right --;
                
            }
        }
        return result;
    }
};
```

## 17. Letter Combinations of a Phone Number

> Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent.
>
> A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.
>
> ![img](http://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Telephone-keypad2.svg/200px-Telephone-keypad2.svg.png)
>
> **Example:**
>
> ```
> Input: "23"
> Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
> ```
>
> **Note:**
>
> Although the above answer is in lexicographical order, your answer could be in any order you want.

```C++
class Solution {
public:
    vector<string> letterCombinations(string digits) {
        if(digits.empty())return vector<string>();
        vector<string> result;
        vector<string> dict = {"","","abc","def","ghi","jkl","mno","pqrs","tuv","wxyz"};
        int n = digits.size();
        result.push_back("");
        for( int i = 0 ; i < n ; i++){
            int index = digits[i] - '0';
            if (0 > index || 10 < index)break;
            vector<string> tmp;
            for ( int j = 0; j < dict[index].size() ; j ++){
                for( int k = 0 ; k < result.size() ; k ++){
                    tmp.push_back(result[k]+dict[index][j]);
                }
            }
            result.swap(tmp);
        }
        
        
        return result;
        
    }
};
```

## 18. 4Sum

> Given an array `nums` of *n* integers and an integer `target`, are there elements *a*, *b*, *c*, and *d* in `nums` such that *a* + *b* + *c* + *d* = `target`? Find all unique quadruplets in the array which gives the sum of `target`.
>
> **Note:**
>
> The solution set must not contain duplicate quadruplets.
>
> **Example:**
>
> ```
> Given array nums = [1, 0, -1, 0, -2, 2], and target = 0.
> 
> A solution set is:
> [
>   [-1,  0, 0, 1],
>   [-2, -1, 1, 2],
>   [-2,  0, 0, 2]
> ]
> ```

```C++
class Solution {
public:
    
    
    
    vector<vector<int>> fourSum(vector<int>& nums, int target) {
        vector<vector<int>> result;
        int n = nums.size();
        if ( 4 > n ) return result;
        sort(nums.begin(),nums.end());
        for( int i = 0 ; i < n-3 ; i ++){
            if (0 < i && nums[i] == nums[i-1]) continue;
            if (nums[i] + nums[i+1] + nums[i+2] + nums[i+3] > target)break;
            if (nums[i] + nums[n-1] + nums[n-2] + nums[n-3] < target)continue;
            for ( int j = i+1 ; j <n-2 ; j++){
                if( i+1 < j && nums[j] == nums[j-1] )continue;
                if(nums[i] + nums[j] + nums[j+1] +nums[j+2] > target)break;
                if(nums[i] + nums[j] + nums[n-1] +nums[n-2] < target)continue;
                int l = j+1;
                int r = n-1;
                while(l < r){
                    int sum = nums[i]+nums[j]+nums[l]+nums[r];
                    if(sum == target){
                        result.push_back(vector<int>{nums[i],nums[j],nums[l],nums[r]});                                            
                        l++;
                        r--;
                        while(l < r && nums[l] == nums[l-1])l++;
                        while(l < r && nums[r] == nums[r+1])r--;
                    }
                    else if (sum < target) l++;
                    else r--;
                }
            }            
        }
        return result;       
    }
};
```

## 19. Remove Nth Node From End of List

> Given a linked list, remove the *n*-th node from the end of list and return its head.
>
> **Example:**
>
> ```
> Given linked list: 1->2->3->4->5, and n = 2.
> 
> After removing the second node from the end, the linked list becomes 1->2->3->5.
> ```
>
> **Note:**
>
> Given *n* will always be valid.
>
> **Follow up:**
>
> Could you do this in one pass?

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
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* start = new ListNode(0);
        start->next = head;
        ListNode* first = start;
        ListNode* second = start;
        int i = n;
        while(first->next != NULL){
            if( 0 >= i){
                second = second->next;
            }
            first = first->next;
            i--;
        }
        second->next = second->next->next;
        return start->next;                
    }
};
```

## 20. Valid Parentheses

> Given a string containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.
>
> An input string is valid if:
>
> 1. Open brackets must be closed by the same type of brackets.
> 2. Open brackets must be closed in the correct order.
>
> Note that an empty string is also considered valid.
>
> **Example 1:**
>
> ```
> Input: "()"
> Output: true
> ```
>
> **Example 2:**
>
> ```
> Input: "()[]{}"
> Output: true
> ```
>
> **Example 3:**
>
> ```
> Input: "(]"
> Output: false
> ```
>
> **Example 4:**
>
> ```
> Input: "([)]"
> Output: false
> ```
>
> **Example 5:**
>
> ```
> Input: "{[]}"
> Output: true
> ```

```C++
class Solution {
public:
    bool isValid(string s) {
        stack<char> tmp;
        for(auto c:s){
/*            if('(' == c || '{' == c || '[' == c)tmp.push(c);
            else if(')' == c && tmp.top() == '(')tmp.pop();
            else if(']' == c && tmp.top() == '[')tmp.pop();
            else if('}' == c && tmp.top() == '{')tmp.pop();
            else ;
*/
            cout<<c<<endl;
            switch(c){
                case '(':;
                case '[':;
                case '{':tmp.push(c);break;
                case ')':if(tmp.empty() || tmp.top() != '(')return false;else tmp.pop();break;
                case ']':if(tmp.empty() || tmp.top() != '[')return false;else tmp.pop();break;
                case '}':if(tmp.empty() || tmp.top() != '{')return false;else tmp.pop();break;
                default:;
            }
            
        }
        return tmp.empty();
        
    }
};
```

