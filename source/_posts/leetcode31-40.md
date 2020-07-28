---
title: leetcode刷题31-40
date: 2019-08-19 17:01:00
tags: C++
---
# leetcode刷题

## 31. Next Permutation

> Implement **next permutation**, which rearranges numbers into the lexicographically next greater permutation of numbers.
>
> If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).
>
> The replacement must be **in-place** and use only constant extra memory.
>
> Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.
>
> ```markdown
> `1,2,3` → `1,3,2`
> `3,2,1` → `1,2,3`
> `1,1,5` → `1,5,1`
> ```

```C++
class Solution {
public:
    void nextPermutation(vector<int>& nums) {
        int n = nums.size();
        int k = -1;
        for(int i = n-1 ; i > 0 ; i--){
            if(nums[i] > nums[i-1]){
                k = i-1;
                break;
            }
        }
        if(k < 0)reverse(nums.begin(),nums.end());
        int l;
        if(k >= 0){
            for(int i = n-1 ; i > k; i--){
                if(nums[i] > nums[k]){
                    l = i;
                    break;
                }
            }
        
        swap(nums[k],nums[l]);
        reverse(nums.begin()+k+1,nums.end());
        }
    }
};
```

## 32. Longest Valid Parentheses

> Given a string containing just the characters `'('` and `')'`, find the length of the longest valid (well-formed) parentheses substring.
>
> **Example 1:**
>
> ```
> Input: "(()"
> Output: 2
> Explanation: The longest valid parentheses substring is "()"
> ```
>
> **Example 2:**
>
> ```
> Input: ")()())"
> Output: 4
> Explanation: The longest valid parentheses substring is "()()"
> ```

```C++
class Solution {
public:
    int longestValidParentheses(string s) {
        stack<int> tmp;
        tmp.push(-1);
        int m = s.length();
        int dummpy = 0;
        int result = 0;
        for(int i = 0 ; i < m ; i++){
            int t = tmp.top();
            if(s[i] == ')' && t!= -1 && s[t] == '('){
                tmp.pop();
                 result = max(result,i-tmp.top());
            }
            else tmp.push(i);

/*            else if(s[i] == ')' ){
                if(tmp.empty() || tmp.top() != '(' ){
                    cout<<"in"<<endl;
                dummpy = 0;
            }
                else {
                tmp.pop();
                dummpy +=2;
                result = max(result,i-tmp.top());
                     }
            
            }*/
        }
    return result;
    }
};
```

## 33. Search in Rotated Sorted Array

> Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.
>
> (i.e., `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`).
>
> You are given a target value to search. If found in the array return its index, otherwise return `-1`.
>
> You may assume no duplicate exists in the array.
>
> Your algorithm's runtime complexity must be in the order of *O*(log *n*).
>
> **Example 1:**
>
> ```
> Input: nums = [4,5,6,7,0,1,2], target = 0
> Output: 4
> ```
>
> **Example 2:**
>
> ```
> Input: nums = [4,5,6,7,0,1,2], target = 3
> Output: -1
> ```

```C++
class Solution {
public:
    int search(vector<int>& nums, int target) {
        int result = -1;
        int m = nums.size();
        int right = m - 1;
        int left = 0;
        int tmp = m/2;
        while(right > left){
            tmp = (right+left)/2;
            if(nums[tmp] > nums[right]) left = tmp + 1;
            else right = tmp;            
        }
        int rotate = left;
        left = 0;
        right = m - 1;
        while(left <= right){
            tmp = (left+right)/2;
            int realmid = (tmp + rotate)%m;
            if(nums[realmid] == target)return realmid;
            if(nums[realmid] < target)left = tmp + 1;
            else right = tmp - 1;                
        }
        return result;

        
    }
};
```

## 34. Find First and Last Position of Element in Sorted Array

> Given an array of integers `nums` sorted in ascending order, find the starting and ending position of a given `target` value.
>
> Your algorithm's runtime complexity must be in the order of *O*(log *n*).
>
> If the target is not found in the array, return `[-1, -1]`.
>
> **Example 1:**
>
> ```
> Input: nums = [5,7,7,8,8,10], target = 8
> Output: [3,4]
> ```
>
> **Example 2:**
>
> ```
> Input: nums = [5,7,7,8,8,10], target = 6
> Output: [-1,-1]
> ```

```C++
class Solution {
public:
    vector<int> searchRange(vector<int>& nums, int target) {
        vector<int> result = {-1,-1};
        int m = nums.size();
        if(1 > m)return result;
        if(1 == m && target == nums[0])result = {0,0};
        int right = m-1;
        int left = 0;
        int mid = (right+left)/2;
        //find the left one
        while(right > left){
            mid = (right+left)/2;
            if(target > nums[mid]) left = mid + 1;
            else right = mid;
            //if(target == nums[mid]) result[0] = mid;
        }
        if(target != nums[left])return result;
            else result[0] = left;
        //find the right one
        right = m -1 ;
        while(right > left){
            mid = (right+left)/2+1;
            if(target >= nums[mid]) left = mid;
            else right = mid-1;
           //if(target == nums[mid]) result[1] = mid;
        }
        result[1] = right;
        
        return result;
    }
};
```

## 35. Search Insert Position

> Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
>
> You may assume no duplicates in the array.
>
> **Example 1:**
>
> ```
> Input: [1,3,5,6], 5
> Output: 2
> ```
>
> **Example 2:**
>
> ```
> Input: [1,3,5,6], 2
> Output: 1
> ```
>
> **Example 3:**
>
> ```
> Input: [1,3,5,6], 7
> Output: 4
> ```
>
> **Example 4:**
>
> ```
> Input: [1,3,5,6], 0
> Output: 0
> ```

```C++
class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        int result = 0;
        int m = nums.size();
        int left = 0;
        int right = m-1;
        int mid = 0;
        while(left < right){
            mid = (right+left)/2;
            if(nums[mid] < target){
                left = mid+1;
            }else right = mid;
            if(nums[mid] == target){
                return mid;
            }
        }        
        result = mid;
        while(nums[result] < target && result < m) {
            result++;
            //cout<<nums[result]<<' ';
        }
        //cout<<endl<<result<<endl;
        return result;
        
        
    }
};
```

## 36. Valid Sudoku

> Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated **according to the following rules**:
>
> 1. Each row must contain the digits `1-9` without repetition.
> 2. Each column must contain the digits `1-9` without repetition.
> 3. Each of the 9 `3x3` sub-boxes of the grid must contain the digits `1-9` without repetition.
>
> ![img](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)
> A partially filled sudoku which is valid.
>
> The Sudoku board could be partially filled, where empty cells are filled with the character `'.'`.
>
> **Example 1:**
>
> ```
> Input:
> [
>   ["5","3",".",".","7",".",".",".","."],
>   ["6",".",".","1","9","5",".",".","."],
>   [".","9","8",".",".",".",".","6","."],
>   ["8",".",".",".","6",".",".",".","3"],
>   ["4",".",".","8",".","3",".",".","1"],
>   ["7",".",".",".","2",".",".",".","6"],
>   [".","6",".",".",".",".","2","8","."],
>   [".",".",".","4","1","9",".",".","5"],
>   [".",".",".",".","8",".",".","7","9"]
> ]
> Output: true
> ```
>
> **Example 2:**
>
> ```
> Input:
> [
>   ["8","3",".",".","7",".",".",".","."],
>   ["6",".",".","1","9","5",".",".","."],
>   [".","9","8",".",".",".",".","6","."],
>   ["8",".",".",".","6",".",".",".","3"],
>   ["4",".",".","8",".","3",".",".","1"],
>   ["7",".",".",".","2",".",".",".","6"],
>   [".","6",".",".",".",".","2","8","."],
>   [".",".",".","4","1","9",".",".","5"],
>   [".",".",".",".","8",".",".","7","9"]
> ]
> Output: false
> Explanation: Same as Example 1, except with the 5 in the top left corner being 
>     modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.
> ```
>
> **Note:**
>
> - A Sudoku board (partially filled) could be valid but is not necessarily solvable.
> - Only the filled cells need to be validated according to the mentioned rules.
> - The given board contain only digits `1-9` and the character `'.'`.
> - The given board size is always `9x9`.

```C++
class Solution {
public:
    bool isValidSudoku(vector<vector<char>>& board) {
        //vector<vector<int>> dir(9,vector<int>(9,0));
        int dir1[9][9] = {0};
        int dir2[9][9] = {0};
        int dir3[9][9] = {0};
        for(int i = 0 ; i < 9 ; i++){
            for(int j = 0 ; j < 9 ; j++){
                if(board[i][j]!= '.' ){
                    int num = board[i][j] - '0' -1;
                    //代表当前数字所在框的索引
                    int k = i/3*3 + j/3;
                    if(dir1[i][num] || dir2[num][j] || dir3[k][num])return false;
                    dir1[i][num] = dir2[num][j] = dir3[k][num] =1;
                }
            }
        }        
        return true;
/*     for(int i = 0 ; i < 9 ; i++){
        for(int j = 0 ; j < 9 ; j++){
            cout<<dir1[i][j];
        }
     }
        cout<<endl;
             for(int i = 0 ; i < 9 ; i++){
        for(int j = 0 ; j < 9 ; j++){
            cout<<dir2[i][j];
        }
     }
        cout<<endl;
             for(int i = 0 ; i < 9 ; i++){
        for(int j = 0 ; j < 9 ; j++){
            cout<<dir3[i][j];
        }
     }
        cout<<endl;
    }*/
};
```

## 37. Sudoku Solver

> Write a program to solve a Sudoku puzzle by filling the empty cells.
>
> A sudoku solution must satisfy **all of the following rules**:
>
> 1. Each of the digits `1-9` must occur exactly once in each row.
> 2. Each of the digits `1-9` must occur exactly once in each column.
> 3. Each of the the digits `1-9` must occur exactly once in each of the 9 `3x3` sub-boxes of the grid.
>
> Empty cells are indicated by the character `'.'`.
>
> ![img](https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Sudoku-by-L2G-20050714.svg/250px-Sudoku-by-L2G-20050714.svg.png)
> A sudoku puzzle...
>
> ![img](https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Sudoku-by-L2G-20050714_solution.svg/250px-Sudoku-by-L2G-20050714_solution.svg.png)
> ...and its solution numbers marked in red.

思路：

```C++
class Solution {
	struct cell // encapsulates a single cell on a Sudoku board
	{
		uint8_t value; // cell value 1..9 or 0 if unset
					   // number of possible (unconstrained) values for the cell
		uint8_t numPossibilities;
		// if bitset[v] is 1 then value can't be v
		bitset<10> constraints;
		cell() : value(0), numPossibilities(9), constraints() {};
	};
	array<array<cell, 9>, 9> cells;

	// sets the value of the cell to [v]
	// the function also propagates constraints to other cells and deduce new values where possible
	bool set(int i, int j, int v)
	{
		// updating state of the cell
		cell& c = cells[i][j];
		if (c.value == v)
			return true;
		if (c.constraints[v])
			return false;
		c.constraints = bitset<10>(0x3FE); // all 1s
		c.constraints.reset(v);
		c.numPossibilities = 1;
		c.value = v;

		// propagating constraints
		for (int k = 0; k<9; k++) {
			// to the row: 
			if (i != k && !updateConstraints(k, j, v))
				return false;
			// to the column:
			if (j != k && !updateConstraints(i, k, v))
				return false;
			// to the 3x3 square:
			int ix = (i / 3) * 3 + k / 3;
			int jx = (j / 3) * 3 + k % 3;
			if (ix != i && jx != j && !updateConstraints(ix, jx, v))
				return false;
		}
		return true;
	}
	// update constraints of the cell i,j by excluding possibility of 'excludedValue'
	// once there's one possibility left the function recurses back into set()
	bool updateConstraints(int i, int j, int excludedValue)
	{
		cell& c = cells[i][j];
		if (c.constraints[excludedValue]) {
			return true;
		}
		if (c.value == excludedValue) {
			return false;
		}
		c.constraints.set(excludedValue);
		if (--c.numPossibilities > 1)
			return true;
		for (int v = 1; v <= 9; v++) {
			if (!c.constraints[v]) {
				return set(i, j, v);
			}
		}
		assert(false);
	}

	// backtracking state - list of empty cells
	vector<pair<int, int>> bt;

	// find values for empty cells
	bool findValuesForEmptyCells()
	{
		// collecting all empty cells
		bt.clear();
		for (int i = 0; i < 9; i++) {
			for (int j = 0; j < 9; j++) {
				if (!cells[i][j].value)
					bt.push_back(make_pair(i, j));
			}
		}
		// making backtracking efficient by pre-sorting empty cells by numPossibilities
		sort(bt.begin(), bt.end(), [this](const pair<int, int>&a, const pair<int, int>&b) {
			return cells[a.first][a.second].numPossibilities < cells[b.first][b.second].numPossibilities; });
		return backtrack(0);
	}

	// Finds value for all empty cells with index >=k
	bool backtrack(int k)
	{
		if (k >= bt.size())
			return true;
		int i = bt[k].first;
		int j = bt[k].second;
		// fast path - only 1 possibility
		if (cells[i][j].value)
			return backtrack(k + 1);
		auto constraints = cells[i][j].constraints;
		// slow path >1 possibility.
		// making snapshot of the state
		array<array<cell, 9>, 9> snapshot(cells);
		for (int v = 1; v <= 9; v++) {
			if (!constraints[v]) {
				if (set(i, j, v)) {
					if (backtrack(k + 1))
						return true;
				}
				// restoring from snapshot,
				// note: computationally this is cheaper
				// than alternative implementation with undoing the changes
				cells = snapshot;
			}
		}
		return false;
	}
public:
	void solveSudoku(vector<vector<char>> &board) {
		cells = array<array<cell, 9>, 9>(); // clear array
											// Decoding input board into the internal cell matrix.
											// As we do it - constraints are propagated and even additional values are set as we go
											// (in the case if it is possible to unambiguously deduce them).
		for (int i = 0; i < 9; i++)
		{
			for (int j = 0; j < 9; j++) {
				if (board[i][j] != '.' && !set(i, j, board[i][j] - '0'))
					return; // sudoku is either incorrect or unsolvable
			}
		}
		// if we're lucky we've already got a solution,
		// however, if we have empty cells we need to use backtracking to fill them
		if (!findValuesForEmptyCells())
			return; // sudoku is unsolvable

					// copying the solution back to the board
		for (int i = 0; i < 9; i++)
		{
			for (int j = 0; j < 9; j++) {
				if (cells[i][j].value)
					board[i][j] = cells[i][j].value + '0';
			}
		}
	}

	bool isValidSudoku(vector<vector<char>>& board) {
		//vector<vector<int>> dir(9,vector<int>(9,0));
		int dir1[9][9] = { 0 };
		int dir2[9][9] = { 0 };
		int dir3[9][9] = { 0 };
		for (int i = 0; i < 9; i++) {
			for (int j = 0; j < 9; j++) {
				if (board[i][j] != '.') {
					int num = board[i][j] - '0' - 1;
					int k = i / 3 * 3 + j / 3;
					if (dir1[i][num] || dir2[j][num] || dir3[num][k])return false;
					dir1[i][num] = dir2[j][num] = dir3[num][k] = 1;
				}
			}
		}
		return true;
	}
};
```

## 38. Count and Say

> The count-and-say sequence is the sequence of integers with the first five terms as following:
>
> ```
> 1.     1
> 2.     11
> 3.     21
> 4.     1211
> 5.     111221
> ```
>
> `1` is read off as `"one 1"` or `11`.
> `11` is read off as `"two 1s"` or `21`.
> `21` is read off as `"one 2`, then `one 1"` or `1211`.
>
> Given an integer *n* where 1 ≤ *n* ≤ 30, generate the *n*th term of the count-and-say sequence.
>
> Note: Each term of the sequence of integers will be represented as a string.
>
> 初始值第一行是 1。
> 第二行读第一行，1 个 1，去掉个字，所以第二行就是 11。
> 第三行读第二行，2 个 1，去掉个字，所以第三行就是 21。
> 第四行读第三行，1 个 2，1 个 1，去掉所有个字，所以第四行就是 1211。
> 第五行读第四行，1 个 1，1 个 2，2 个 1，去掉所有个字，所以第五航就是 111221。
> 第六行读第五行，3 个 1，2 个 2，1 个 1，去掉所以个字，所以第六行就是 312211。

```C++
class Solution {
public:
    string countAndSay(int n) {
        if(n == 0)return "";
        string cur = "1";
        string nex = "";
        
        while(--n)
        {          
            for(int i = 0;i < cur.size();i++)
            {        
                int count = 1;
                while(( i+1 < cur.size() )&& cur[i] == cur[i+1])
                {
                    count ++;
                    i++;
                }
                nex += (to_string(count)+cur[i]);
            }
            cur = nex;
            nex = "";
        }
        return cur;
    }
};
```

## 39. Combination Sum

> Given a **set** of candidate numbers (`candidates`) **(without duplicates)** and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sums to `target`.
>
> The **same** repeated number may be chosen from `candidates` unlimited number of times.
>
> **Note:**
>
> - All numbers (including `target`) will be positive integers.
> - The solution set must not contain duplicate combinations.
>
> **Example 1:**
>
> ```
> Input: candidates = [2,3,6,7], target = 7,
> A solution set is:
> [
>   [7],
>   [2,2,3]
> ]
> ```
>
> **Example 2:**
>
> ```
> Input: candidates = [2,3,5], target = 8,
> A solution set is:
> [
>   [2,2,2,2],
>   [2,3,3],
>   [3,5]
> ]
> ```

```C++
class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        vector<vector<int>> result;
        sort(candidates.begin(),candidates.end());
        vector<int> combination;
        combinationSumCore(candidates,result,target,combination,0);
        return result;        
    }
private:
    void combinationSumCore(vector<int>& candidates,vector<vector<int>> &result,int target,vector<int> &combination,int begin)
    {
        if(!target)
        {
            result.push_back(combination);
            return ;
        }
        for(int i = begin;i < candidates.size() && target >= candidates[i];i++)
        {
            combination.push_back(candidates[i]);
            combinationSumCore(candidates,result,target-candidates[i],combination,i);
            combination.pop_back();
        }
    }
};
```

## 40. Combination Sum II

> Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sums to `target`.
>
> Each number in `candidates` may only be used **once** in the combination.
>
> **Note:**
>
> - All numbers (including `target`) will be positive integers.
> - The solution set must not contain duplicate combinations.
>
> **Example 1:**
>
> ```
> Input: candidates = [10,1,2,7,6,1,5], target = 8,
> A solution set is:
> [
>   [1, 7],
>   [1, 2, 5],
>   [2, 6],
>   [1, 1, 6]
> ]
> ```
>
> **Example 2:**
>
> ```
> Input: candidates = [2,5,2,1,2], target = 5,
> A solution set is:
> [
>   [1,2,2],
>   [5]
> ]
> ```

```C++
class Solution {
public:
    vector<vector<int>> combinationSum2(vector<int>& candidates, int target) {
        vector<vector<int>> result;
        sort(candidates.begin(),candidates.end());
        vector<int> combination;
        combinationSum2Core(candidates,result,target,combination,0);
        return result;        
    }
private:
    void combinationSum2Core(vector<int>& candidates,vector<vector<int>> &result,int target,vector<int> &combination,int begin)
    {
        if(!target)
        {
            result.push_back(combination);
            return ;
        }
        for(int i = begin;i < candidates.size() && target >= candidates[i];i++)
        {
            if (i == begin || candidates[i] != candidates[i - 1])
            {
            combination.push_back(candidates[i]);
            combinationSum2Core(candidates,result,target-candidates[i],combination,i+1);
            combination.pop_back();
            }
        }
    }
};
```

