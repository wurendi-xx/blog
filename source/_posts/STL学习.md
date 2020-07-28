---
title: STL学习过程
date: 2019-04-13 16:37:34
tags: C++
---
# STL学习过程

前言：STL的学习看的是“侯捷STL”的教学视频，学习是为了更好地了解C++，养成更好的编程习惯，视频比较杂，暂时用要点的方式把需要记录的东西一个个记录下来。

## STL体系结构基础介绍

>STL分为6大部件

+ 容器（container）
+ 分配器（allocatior）
+ 算法（algorithm）
+ 迭代器（iterator）
+ 适配器（adapter）
+ 仿函数（functor）

技术基础：

+ 泛化：template \<class type\> struct _type_traits

+ 全特化：template <> struct _type_traits\<int\>
+ 偏特化：template \<class T\> struct _type_traits<T*>

 ## 分配器Allocators

+ 要点operator new()操作会调用malloc(),并且返回的指针指向的空间会多出一部分内容用于内存管理(overhead)。
+ gcc2.9中使用特殊的alloc，其开辟的空间大小是8的倍数，并用链表实现，减少malloc调用，节省额外开销(overhead)。

## 容器Containter

+ 容器直接的关系不是继承（inheritance），而是复合（composition）。  

序列式容器：

+ array（12字节）
+ vector（12字节）
  + heap
+ list（8字节）
+ forward_list（4字节）
+ deque（40字节）
  + stack
  + queue

关联式容器：

+ rb_tree(红黑树)（24字节->3ptr+1color）
  + set（key值不可以重复）
  + map
  + multiset（key值可以重复）
  + multimap
+ hashtable（28字节）
  + unordered_set
  + unordered_map
  + unordered_multiset
  + unordered_multimap

### 容器list

操作符重载例子：

+ postfix form（后++）：self operator++ (int)。
+ prefix form（前++）: self& operator++ ( )。(返回类型的不同是为了模拟int，int中i++++操作不被允许)。

+ list是环装双向链表，在尾端加了一个空白节点，是为了复合STL的前闭后开的原则。

### iterator迭代器设计原则
+ 所有容器iterator都会有5个typedef（traits特性）：
  1. iterator_category（迭代方式，例如只能向前传递或双向传递）
  2. value_type（数值类型）
  3. pointer（暂未被使用）
  4. reference（暂未被使用）
  5. difference_type（两个iterator之间距离的类型）
+ Iterator Traits迭代器萃取机：分离class iterators和non-class iterators（防止遇到不含成员的低级指针的迭代器），用来分辨获得的iterator的类型并取得其特性。（使用模板的特化实现。）

### 容器vector

+ vector中有三个元素：start、finish、end_of_storage。
+ vector扩充空间时创建当前空间乘以2的大小的空间，并将数据复制过去。

### 容器deque

+ 运用分段存储实现向前向后扩容。利用deque iterator模拟连续空间，操作符重载。
+ deque的迭代器中有4个元素：cur、first、last、node
  + cur代表当前元素位置
  + first代表当前段的第一个节点
  + last代表当前段的最后一个节点
  + node代表其所在段在deque的位置
+ 每一个buff里有512/sizeof(T)个元素。

### 容器rb_tree

+ rb_tree<class Key,class value,class KeyOfValue,class Compare>（第三个用来找到value里的key）。
+ insert_unique()和insert_equal()分别是可以插入不重复和重复key值的函数。

#### 容器set

+ set实际上算是红黑树的adapter，其中iterator是const，为了禁止客户对元素进行赋值。

#### 容器map

+ 通过定义  typedef pair<const Key, T> value_type; 来实现key的不可修改。
+ 容器map有独特的operator[]，会通过中括号寻找key对应的值，没有则创建新的元素。

### 容器hashtable

+ 哈希表的大小刻意为质数（素数），有一个质数表以供使用。
+ 如果需要扩充，则扩大两倍并找到最近的质数作为哈希表的大小。
+ 默认计算方式为data%sizeof(hashtable)
+ 如果有位置冲突，则在冲突地地方生产一个链表

## 算法Algorithm

通用形式：

```C++
template <typename Iterator>
Algorithm(Iterator itr1,Iterator itr2)
{
    ...;
}
template <typename Iterator,typename Cmp>
Algorithm(Iterator itr1,Iterator itr2,Cmp comp)
{
    ...;
}
```

### 迭代器对算法的影响

迭代器的5种移动特性：

+ input_iterator_tag（istream）
+ output_iterator_tag（ostream）
+ forward_iterator_tag（forward_list,unorderd_set,unorderd_map,unorderd_multiset,unorderd_multimap）
+ bidirectional_iterator_tag（list,map,set,multiset,multimap）
+ random_access_iterator_tag（array,vector,deque） 

copy算法会针对不同的迭代器采用不同的算法。比如如果遇到较为简单的const char*则会使用memmove()（速度极快的低阶system级别的拷贝函数）。

### 常用算法

accumulate()

```C++
//默认累加
template <class InputIterator,class T,class BinaryOperation>
T accumulate(InputIterator first,
            InputIterator last,
            T init,
            BinaryOperation binary_op)
{
    for( ;first != last; first++)
        init = binary_op(init,first*);
    return init;
}
    
```

for_each()

```C++
template <class InputIterator,class Function>
Function for_each(InputIterator first,
            InputIterator last,
			Function f)
{
    for( ;first != last; first++)
        f(first*);
    return f;
}
    
```

replace(),replace_if(),replace_copy()

```C++
template <class InputIterator,class Function>
void replace(InputIterator first,
            InputIterator last,
			const T& old_value,
         	const T& new_value)
{
    for( ;first != last; first++)
        if(*first == old_value)
    	*first == new_value;
}
```

```C++
template <class InputIterator,class Function>
void replace_if(InputIterator first,
            InputIterator last,
			Predicate pred,
         	const T& new_value)
{
    for( ;first != last; first++)
        if(pred(*first))
    	*first == new_value;
}
```

count()

```C++
template <class InputIterator,class T>
typename iterator_traits<InputIterator>::difference_type
count(InputIterator first,
            InputIterator last,
         	const T& value)
{
    typename iterator_traits<InputIterator>::difference_type n = 0;
    for( ;first != last; first++)
        if(*first == value)
    	++n;
    return n;
}
```

find(),find_if()

```C++
template <class InputIterator,class T>
InputIterator find(InputIterator first,
            InputIterator last,
         	const T& value)
{
    typename iterator_traits<InputIterator>::difference_type n = 0;
	while(first != last && first* != value)
    	++first;
    return first;
}
```

sort()

```C++
//实现复杂不写了
template <class InputIterator>
bool sort(InputIterator first,
            InputIterator last)
```

reverse():

思想：是通过将迭代器左右倒置，仅仅改变迭代器及其规则来实现容器的倒置。

binary_search():

```C++
template <class ForwardIterator,class T>
bool binary_search(ForwardIterator first,
            ForwardIterator last,
         	const T& value)
{
    //除了lower_bound之外还有upper_bound，区别是如果有寻找的是重复的数字，则前者输出第一次出现的位置，后者输出最后一次出现的下一个位置
    first = std::lower_bound(first,last,value)
    return (first != last && !(value < *first));
}
```



## 仿函数Functor

+ Functor一般为算法服务
+ 分为算术类、逻辑运算类、相对关系类。

比如：

```C++
template <class T>
    struct plus : public binary_function<T,T,T>{
        T operator()(const T& x,constT& y)const{
            return x+y;
        }
    };
```

+ 传入算法函数中需要传入对象，比如

  ```C++
  sort(myvec.begin(),myvec.end(),less<int>());
  ```

  其中less\<int\>是类型，less\<int\>()是对象。

  因为其中是这样定义的：（其中public binary_function<T,T,bool>是为了继承STL）

  ```C++
  template <class T>
      struct less : public binary_function<T,T,bool>{
          bool operator ()(const T& x,const T& y)const
          {return x > y;}
      };
  ```

  

### 仿函数的可适配条件

+ STL规定每个Adaptable Function都应该选择适当的function继承：(两者的区别是function涉及操作数的个数)

  ```C++
  template <class Arg,class Result>
  struct unary_function{
  typedef Arg argument_type;
  typedef Result result_type;
  };
  template <class Arg1,class Arg2,class Result>
  struct binary_function{
  typedef Arg1 first_argument_type;
  typedef Arg2 second_argument_type;
  typedef Result result_type;
  };
  ```

## 适配器Adapter

+ 不是通过继承而是通过内含的方式来实现adapter。
+ 使用范例：stack，queue就是通过适配器deque来实现的。

### 函数适配器binder2nd

用法：

std::cout<<count_if(vi.begin() ,vi.end(), not1( bind2nd( less\<int\>(), 40)));

+ 函数适配器not1

### 函数适配器bind

   std::bind可以绑定
  1.  functions
  2.  function objects
  3.  member functions,_1必须是某个object地址
  4.  data members,_1必须是某个object地址

使用实例：

```C++
double my_divide(double x,double y)
{return x/y;}

auto fun1 = bind(my_divide,10,2);
cout<< fun1()<<endl;//输出5
```

### 迭代器适配器reverse_iterator

```C++
reverse_iterator
rbegin()
{return reverse_iterator(end());}
reverse_iterator
rend()
{return reverse_iterator(begin());}
```

核心代码:

```C++
//对逆向迭代器取值就是讲“对应的正向迭代器”退一位取值。
reference operator*()const{
    Iterator tmp = current;
    return *--tmp; 
}
```

### 迭代器适配器inserter

用法：inserter(containter,iterator)

```C++
list<int> foo,bar;
for(int i = 1;i <= 5;i++)
{
    foo.push_back(i);
    bar.push_back(i*10);    
}

list<int>::iterator it = foo.begin();
advance(it,3);

copy(bar.begin(),bar.end(),inserter(foo,it));
//before:
//foo:1,2,3,4,5
//bar:10,20,30,40,50
//after:
//foo:1,2,3,10,20,30,40,50,4,5
//bar:10,20,30,40,50

```

实现方法是通过操作符重载改变copy中'='的操作。

### X适配器：ostream_iterator

使用实例：

```C++
std::ostream_iterator<int> out_it(std::cout,',');
std::copy (myvector.begin(),myvector.end(),out_it);
//结果会cout出myvector中的每一个元素，并在其中夹杂','。
```

### X适配器：istream_iterator

使用实例：

```C++
std::istream_iterator<int> iit(std::cin),eos;//eos(end of stream)用于标记终点
std::copy (iit,eos,inserter(c,c.begin()));
//结果会cin输入数据到容器c
```

## 一些用例

### tuple

```C++
tuple<string,int,int,complex<double>> t;
std::cout<<sizeof(t)<<endl;//输出32 
//string:4	int:4	double:8    complex<double>:16
//应该是4+4+4+16 = 28
```

实现原理（挺复杂的，只记下定义）：

```C++
template<typename Head,typename... Tail>
class tuple<Head,Tail...>
: private tuple<Tail>
{
	typedef tuple<Tail...>inherited;
public:
	tuple(){}
	//这里是初始化列表
	tuple(Head v,Tail... vtail)
	:m_head(v),inherited(vtail...){}
	
	typename Head::type head(){return m_head;}
	inherited& tail(){return *this;}
protected:
	Head m_head;
	
};
```



### type traits

用来保存数据中一些特性的重要性。

```C++
//泛化版本  Gcc2.9版本
template <class type>
struct __type_traits{
typedef __true_type this_dummy_member_must_be_first;
typedef __false_type has_trivial_default_constructor;
typedef __false_type has_trivial_copy_constructor;
typedef __false_type has_trivial_assignment_operator;
typedef __false_type has_trivial_destructor;
typedef __false_type is_POD_type;//Plain Old Data
};
```

会对算法里面一些操作有影响，比如copy()。

+ POD用来表明C++中与C相兼容的数据类型，可以按照C的方式来处理（运算、拷贝等）。非POD数据类型与C不兼容，只能按照C++特有的方式进行使用。其实POD本质就是与c兼容的数据类型。 

### moveable对各种容器速度的影响

+ moveable元素对vector的影响极大

## 杂项

  

+ memcpy和memmove（）都是C语言中的库函数，在头文件string.h中，作用是拷贝一定长度的内存的内容，原型分别如下：

  ```C++
void *memcpy(void *dst, const void *src, size_t count);
void *memmove(void *dst, const void *src, size_t count);
  ```

  他们的作用是一样的，唯一的区别是，当内存发生局部重叠的时候，memmove保证拷贝的结果是正确的，memcpy不保证拷贝的结果的正确。

+ 深拷贝和浅拷贝的区别：浅拷贝只复制指针，深拷贝复制内容。
+ 编译器自动提供的copy函数是浅拷贝。

