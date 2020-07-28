---
title: Note of Effective C++
date: 2019-03-05 16:44:47
tags: C++
---

# *Effective C++*浏览过程
---
[TOC]
## 条款01：视C++为语言联邦

1.C：C++是以C为基础的语言。
2.Object-Oriented C++：C++中面向对象的内容。
3.Template C++：C++中泛型编程的内容。
4.STL：C++中的标准库。

## 条款02：尽量用const，enum，inline来替换#include

+ 对于单纯常量，最好用const或者enum来代替#include
+ 对于宏定义（Marco），最好改用inline函数（template inline）替换#include

## 条款03：尽量使用const

+ 如果关键字const出现在星号左边，则被指物是常量。
+ 如果关键字const出现在星号右边，则被指针是常量。
+ STL中如果需要声明一个'T\* const指针‘，则使用const_iterator。
+ 成员函数其常量性的不同，也可以被重载 。

## 条款04：确定对象在使用前已被初始化

+ 初始化和赋值并不一样，比如构造函数中初始化发生在进入构造函数本体（即赋值语句）之前。所以构造函数最好使用成员初值列(member initalization list)，而非赋值操作(assignment)。其成员的初始化顺序与声明顺序相同。
+ 为内置型对象（如int,double）进行手工初始化，因为C++不保证初始化它们。

## 条款05：了解C++隐式编写并调用了哪些函数

+编译器会暗自给class创建default构造函数，copy构造函数，copy assignment操作符，以及析构函数。

## 条款06：如果不想使用编译器自动生成的函数，就应该明确拒绝

+ 可以将相应的成员函数声明为private来拒绝编译器自动提供的功能（比如copy构造函数或copy assignment操作符）。

## 条款07：为多态基类声明virtual析构函数

+ 只有当class包含至少一个virtual函数时，才给它声明一个virtual析构函数。
+ 如果class的设计目的不是作为base class使用或者具备多态性时(polymorphically)，就不该声明析构函数。

## 条款08：别让异常逃离析构函数

+ 不能让析构函数吐出异常，不然会带来“过早结束程序”或者“发生不明确行为”的风险。
+ 如果客户需要对某个函数运行期间抛出的异常做出反应，那么class应该提供一个普通函数（而非析构函数）执行该操作。

## 条款09：绝不要在构造和析构函数中调用virtual函数

+ 在构造和析构（连同它们调用的所有函数）中不要调用virtual函数，因为这类调用不会下降至derived class（派生类）。

## 条款10：令operator= 返回一个 reference to \*this

+ 令赋值（assignment）操作符返回一个reference to \*this ，这个协议被所有内置和标准程序库提供的类型如string，vector等等共同遵守。

## 条款11：在operator中处理“自我赋值”

+ 确保当对象自我赋值时能够有良好的行为（自我赋值时先赋值后销毁，而不是赋值一个已经被删除的对象）。比如比较“来源对象”和“目标对象”地址，copy-and-swap。
+ 确保任何函数操作一个以上对象，其多个对象是同一对象时，其行为任然正确。

## 条款12：复制对象时不要忘记每一个成分

+ cpoying函数应该保证复制“所有成员变量”及其“base class（基类）的成员变量即调用基类的copying函数”。
+ 当copy构造函数和copy assignment操作符有相近代码时，建立一个新的成员函数供两者调用来消除重复代码，一般这个新的成员函数是名为init的private函数。

## 3.资源管理

## 条款13：以对象管理资源

+ 为了防止资源的泄漏，请使用RAII(Resource Acquisition Is Initialization)对象，他们在构造函数之中获得资源并在析构函数之中释放资源，避免对象结束时忘记释放资源导致内存泄漏。
+ 两个常被使用的RAII classes是trl::shared_ptr和auto::ptr。前者通常是最佳选择，其copy行为比较直观。而auto_ptr进行复制操作时会让被复制对象（即原对象）指向null。

## 条款14：在资源管理类中小心copying行为

+ 复制RAII对象时必须一并复制它所管理的资源，而资源的copying行为决定RAII对象的copying行为。
+ 常见的RAII class copying行为是：禁止复制（比如互斥锁Mutex Lock），引用计数法（trl::shared_ptr，用在希望保有资源知道它的最后一个对象被销毁）。

## 条款15：在资源管理类中提供对原始资源的访问

+ APis往往要求访问原始资源（raw resource），所以每一个RAII class应该提供一个“获取其管理资源的方法”（比如trl::shared_ptr的get( ) 函数用以返回一个原始指针）。
+ 对原始资源的访问有显式和隐式两种，显式较为安全，隐式对客户而言比较方便。

## 条款16：成对使用new和detele时要采取相同形式

+ 如果在new表达式中使用了[ ]，必须在相应的delete表达式中也使用[ ]。

## 条款17：以独立语句将newed对象置入智能指针

+ 以独立语句将newed对象置如智能指针之中，因为在复合语句中编译器对于多个操作有重新排列的自由度，有时其他操作导致的异常会影响到智能指针的创建。一旦异常被抛出可能会导致难以察觉的资源泄漏。

## 4.设计与声明

## 条款18：让接口容易被使用，不易被误用

+ 好的接口很容易被正确地使用，不容易被误用。应该在所有接口中努力达成这些性质。
+ “促进正确的使用”的方法包括接口的一致性，以及与内置类型的行为兼容。
+ “阻止误用”的方法包括建立新的类型、限制类型上的操作，束缚对象值，以及消除客户的资源管理责任。
+ trl::shared_ptr支持定制删除器（custom deleter）。这可以用来防范DLL问题（cross-DLL problem：发生在对象在一个DLL中被new创建，在另一个DLL中被delete销毁），还被用来自动解除互斥锁（mutex；见条款14），等等。

## 条款19：设计class犹如设计type

+ 新type的对象应该如何被创建和销毁？
+ 对象的初始化和对象的赋值应该有什么样的差别？
+ 新的type对象如果被passed by value（以值传递），意味着什么？
+ 什么是新type的“合法值”？
+ 你的新type需要配合某个继承图系吗（inheritance graph）？可能会受到“它们的函数是virtual或non-virtual”的影响
+ 你的新type需要什么样的转换？
+ 什么样的操作符和函数对此type是合理的？
+ 什么样的标准函数应该被驳回？那些需要被声明为private（见条款6）。
+ 谁会取用type的成员？这个问题会决定成员是public、private或protected。
+ 什么是新type的“未声明接口“（undeclared interface）？
+ 你的新type有多么一般化？如果很大（定义一整个家族），就应该定义一个新的class template。
+ 你真的需要一个新type吗？

## 条款20：宁可用pass-by-reference-to-const替换pass-by-value

+ 尽量以pass-by-reference-to-conse替换pass-by-value，前者比较搞笑，并可避免切割问题（slicing problem：因为值传递在构造函数中，其特化信息（比如派生类对象被切除为基类）会被切除）。

+ 以上规则不适用于内置类型，以及STL的迭代器和函数对象。对它们而言pass-by-value往往比较合适。

## 条款21：必须返回对象时，别妄想返回其reference

+ 绝对不要返回pointer或reference指向一个local stack对象，或返回reference指向一个能heap-allocated对象，或返回pointer或reference指向一个local static 对象而有可能同时需要多个这样的对象，条款4中”合理返回reference指向一个local static对象“。

## 条款22：将成员变量声明为private

+ 切记将成员变量声明为private，这可以赋予客户访问数据的一致性、可细微划分访问控制、承诺约束条件得到保证，并给class作者充分的实现弹性。
+ protected不比public更具封装性（比如在使用它的derived classes都会受到影响）。

## 条款23：宁可用non-member、non-friend替换member函数

+ 这样做可以增加封装性、包裹弹性（packing flexibility）和技能扩充性。
+ non-member、non-friend函数可以放在命名空间（namespace）中来方便使用。

## 条款24：若所有参数都需要类型转换，请为此采用non-member函数

+ 如果你需要为某个函数的所有参数（包括被this指针所指的那个隐喻参数）进行类型转换，那么这个函数必须是个non-member。（只有当参数位于参数列时，这个参数才是隐式类型的合格参与者）

## 条款25：考虑写一个不抛异常的swap函数

+ 当std::swap对你写的类型效率不高时，提供一个swap成员函数，并保证这个函数不会抛出异常。
+ 如果提供member的swap函数，也应该提供一个non-member的swap函数来调用前者。对于classes（而非template），也请特化std::swap。
+ 调用swap时针对std::swap使用using声明式，然后调用swap并且不带任何”命名空间资格修饰“。
+ 为”用户定义类型“进行std templates全特化是好的，但是不要在std中加入新的东西。
+ pimpl手法（pointer to implementation ）：通过一个私有的成员指针，将指针指向的类的内部实现数据进行隐藏（见条款31）。

## 条款26：尽可能延后变量定义式的出现时间

+ 尽可能延后变量定义式的出现，这样做可以增加程序的清晰度并改善程序效率。（在变量定义时直接在构造时指定初值）

## 条款27：尽量少做转型动作

+ C++新式转型
	1. const_cast<T>(expression)
	2. dynamic_cast<T>(expression)
	3. reinterpret_cast<T>(expression)
	4. static_cast<T>(expression)
+ const_cast用来将对象的常量性转移（cast away the constness）。
+ dynamic_cast主要用来执行“安全向下转型”（safe downcasting），也就是用来决定某个对象是否归属继承体系中的某个类型。
+ reinterpret_cast执行低级转型，实际动作取决于编译器，比如将一个pointer to int 转型为一个int。
+ static_cast用来强迫隐式转换比如将non-const转换为const，将int转换为double。

+ 如果可以，避免转型，特别是在注重效率的代码中避免使用例如dynamic_cast的转型，如果有设计需要转型，试着发展无需转型的代码设计。
+ 如果转型是需要的，试着将它们隐藏于某个函数之后，而不需要让客户进行显示的转型。
+ 宁可使用C++的新式转型，也不要使用旧式转型，因为前者容易辨识出来，并且也比较有分门别类的职责。

## 条款28：避免返回handles指向对象内部成分

+ 避免返回handles（包括reference、指针和迭代器）指向对象内部。这样可以增加封装性，让const函数表现出const行为，同时将“虚吊号牌”（hanging handles）的可能性降到最低。

## 条款29：为“异常安全”的努力是值得的

+ 当异常被抛出时，有异常安全的函数会：
	1. 不泄露任何资源
	2. 不允许数据破坏
+ 异常安全函数（exception-safe functions）会提供下面三个保证之一：
	1. 基本承诺：如果异常被抛出，程序内任何事物仍然处于有效状态下，所有对象都处于前后一致的状态下。
	2. 强烈保证：如果异常被抛出，程序状态不改变。如果函数成功，就是完全成功，如果函数失败，那就要返回“调用函数之前‘’的状态。
	3. 不抛掷（nothrow）保证：承诺绝不抛出异常，例如作用于内置类型（int，指针等等）身上的操作都提供nothrow保证。

+ 异常安全函数即使发生异常也不会发生泄漏或者允许任何数据结构被破坏。这样的函数分为三种：基本型，强烈型，不抛掷异常型。
+ “强烈保证”可以通过copy-and-swap来实现（在开始创建一个副本，对副本进行操作，最后让副本和本体进行替换），由于它会消耗时间和空间成本，所以并非都有实践意义。
+ 函数提供的“异常安全保证”只等于其所调用各个函数中“异常安全”最低者。

## 条款30：透彻了解inling的里里外外

+ 将大多数inline函数限制在小型、频繁被调用的函数上，可以使得调试和程序升级变得容易，同时也避免了代码的膨胀。
+ 不要因为template出现在头文件，就将其声明为inline，template的具现化与inline无关。

## 条款31：将文件中的编译依存关系降到最低

+ 支持"编译依存性最小化"的一般构想是：相依于声明式而非定义式。基于此构想的两种手段是Handle classes和Interface classes。
+ 程序头文件应该“完全且仅有声明式”的形式存在，这种做法不论是否涉及templates都适用。

## 继承与面向对象设计

## 条款32：确定你的public继承有is-a的关系

+ "public继承”意味is-a，适用于base class的对象其也适用于derived class身上，因为derived class也是一个base class对象。

## 条款33：避免遮掩继承过来的名称

+ derived classes内的名称会遮掩base class内的名称。
+ 为了让被遮掩的名称重新使用，可以用using声明式或者inline转交函数（为了给不支持using的编译器使用）（forwarding functions）。

## 条款34：区分接口继承和实现继承

+ 接口继承和实现继承不同。在public继承之下，derived classes总是继承base class的接口。
+ pure virtual函数只是指定接口继承。$\bigstar$
+ 简朴的（非纯虚函数）impure virtual函数具体指定接口继承和缺省实现继承。$\bigstar$
+ non-virtual函数具体指定接口继承以及强制性实现继承。

## 条款35：考虑virtual函数以外的选择

+ 几个virtual函数的替代方法：
	+ 使用non-virtual-interface（NVI）手法，这是Template Method设计模型中一种特殊模式。它以public non-virtual成员函数包裹较低访问性（private或者protected）的virtual函数。
	+ 将virtual函数替换成“函数指针成员变量”，这是strategy设计模式的一种分解表达形式。
	+ 用trl::function成员变量替换virtual函数，因而允许使用任何可调用物（callable entity）搭配一个兼容于需求的签名式。这也是strategy设计模式的一种表现。
	+ 将继承体系内的virtual函数替换成另一个继承体系中的virtual函数。这也是strategy的一种体现。
+ 将机能从成员函数移到class外部函数，带来的一个缺点是，非成员函数无法访问class的non-public成员。
+ trl::function对象的行为就像是一般的函数指针，这样的对象可以接纳“给定目标签名式兼容”的所有可调用物（callable entities）。	

## 条款36：绝不重新定义继承过来的non-virtual函数

+ 绝对不要重新定义继承而来的non-virtual函数。如果需要就将其定义为virtual函数。

## 条款37：绝不重新定义继承而来的缺省参数值

+ 绝对不要重新定义一个继承过来的缺省参数，因为缺省参数值都是静态绑定的，而virtual函数-需要覆写的东西-是动态绑定的。
+ 复习：动态绑定和静态绑定。静态绑定指的是静态类型，动态绑定指的是目前所指的对象。比如Shape* pc = new circle。shape*是静态类型，circle是动态绑定，会影响virtual函数的调用情况。

## 条款38：通过复合塑模出has-a或“根据某物实现出”

+ 复合（composition）的意义和public继承完全不同。
+ 在应用域（application domain），复合代表has-a（有一个）。在实现域（implementation domain），复合意味着is-implemented-in-terms-of（根据某物实现出）。

## 条款39：明智且谨慎地使用private继承

+ private继承代表着is-implemented-in-terms-of（根据某物实现），它比复合的级别低。但是当derived class 需要访问protected base class的成员时，或者需要重新定义virtual函数时，这么设计是合理的。
+ 和复合不同，private继承可以做到empty class继承最优化。这样可以使得空间最小化，有这类需求时可以使用private继承。EBO（empty base optimization），空白基类最优化。

## 条款40：明智且谨慎地使用多重继承

+ 多重继承比单一继承复杂。它可能导致新的歧义性，以及对virtual继承的需要。
+ virtual继承会增加大小、速度、初始化复杂度等等成本。如果virtual base class不带任何数据，则最有实用价值。
+ 多重继承的确有正当用途。其中某一个情节设计“public继承某一个interface class”和“private继承某个协助实现的class”两者结合。

## 模版和泛型编程

## 条款41：了解隐式接口和编译器多态性

+ classes和templates都支持接口（interface）和多态（polymorphism）。
+ 对classes而言接口是显式的（explict），以函数签名为中心。多态通过virtual函数发生于运行期。
+ 对templates参数而言，接口是隐式的（implicit），基于有效表达式的。多态通过template具现化和函数重载解析发生于编译器。

## 条款42：了解typename的双重意义

+ 声明template参数时，前缀关键字typename和class可以互换。
+ 用关键字typename表示嵌套从属类型名称（因为编译器不知道某个东西是不是类型，会默认这个名称不是一个类型），但不得在base class list或member initialization list内以它作为base class修饰符。

## 条款43：学习处理模板化基类的名称

+ 对面"指涉base class members"之无效references，编译器的诊断时间可能发生在早期（当解析derived class template的定义式时），也可能发生在晚期（当templates被特定的template具现化时），一般C++偏向于早期。
+ 可以在derived class templates内通过“this->”指涉base class templates内的成员名称，或由一个明白写出“base class资格修饰符”完成。

## 条款44：将与参数无关的代码抽离template

+ template生成多个classes和多个函数，任何template代码都不应该和某个导致膨胀的template参数发生相依关系。
+ 因非类型参数导致的代码膨胀往往可以消除，做法是以函数参数或者class成员变量替换template参数。
+ 因类型参数（type parameters）导致的代码膨胀可以降低，做法是让带有完全相同的二进制表述和具体实现类型共享实现代码。

## 条款45：运用成员函数模版接受所有兼容类型

+ 使用member function templates（成员函数模版）生成“可以接受所有兼容类型”的函数。
+ 如果你声明member function来实现“泛化copy构造”和“泛化assignment操作”，还是需要声明正常的copy构造函数和assignment操作（防止编译器自动生成，见条款5）。

## 条款46：需要类型转换时为模版定义非成员函数

+ 当我们编写一个class template，当它提供“与此template相关”的函数支持的“所有参数支持隐式转换”时，将这些函数定义为“class template内部的friend函数”（实现也放在声明中）。

## 条款47：请使用traits classes表现类型信息

+ STL有5类迭代器：input（只能向前移动一步，读取一次），output（只能向前移动一步，写一次），forward（前两者的结合并能读写多次），bidrectional（比forward多了向后移动），random_access（能移动任意步）。（这些迭代器之间的继承关系是is-a）
+ traits classes使得“类型相关信息”在编译期可用。它们以template和“template特化”完成实现。
+ 整合重载技术（overloading）后，traits classes可能在编译器对类型执行if...else测试。

## 条款48：认识template元编程（TMP：template metaprogramming）

+ Template metaprogramming可将工作从运行期移到编译器，因而得到早起的错误侦测和运行效率。
+ TMP可被用来生成“基于政策选择组合”的客户定制代码，也可用来避免生成对某些特殊类型并不适合的代码。

## 定制new和delete

## 条款49：了解new-header的行为

+ set_new_handler允许客户指定一个函数，在内存分配无法获得满足时被调用。
+ Nothrow new 比较局限，因为它只适用于内存分配；后继的构造函数还是可能抛出异常。
+ template的set-new-header，为了让每一个class拥有实体互异的newHandlerSupport复件（实际上T不需要被使用）。

## 条款50：了解new和delete的合理替换时机

+ 替换new和delete的理由
	1. 用来检测运用上的错误（new在区块前后放置特定的byte patterns即签名，delete通过检查）。
	2. 为了强化效能。
	3. 为了收集使用上的统计数据。

+ 有许多理由需要写自定的new和delete，包括改善效能、对heap运用错误进行调试、收集heap使用信息。

## 条款51：编写new和delete需要固守常规

+ operator new应该内含一个无穷循环，并在其中尝试内存分配，如果它无法满足内存需要，就调用new-handler。它应该有能力处理0 byte申请。Class专属版本则还应该处理“正确大小更大（错误）的申请”。
+ operator delete应该在收到null指针时不做任何事情。Class专属版本还应该处理“比正确大小更大的（错误）申请”。

## 条款52：写了placement new也要写placement delete

+ 当你写一个placement operator new（除了接受size_t还有其他参数的new），请确定也写出对应的placement operator delete。如果没有这么做，你的程序可能会发生隐蔽的时断时续的内存泄漏。
+ 当你声明placement new和placement delete，请不要无意识遮掩它们的正常版本。

## 杂项讨论

## 条款53：不要轻视编译器的警告

+ 严肃对待编译器发出的警告信息。努力在你的编译器的最高警告级别下获得“无任何警告”。
+ 不要过度依赖编译器的报警能力，因为不同编译器对待事物的态度并不相同，一旦移植到另一个编译器上，可能警告会消失。

##条款54：让自己熟悉包括TR1在内的标准库

+ TR1：Technical Report 1。里面有新的语言特性
+ C++标准程序库的主要机能由STL、iostream、locales组成。并包含C99标准程序库。
+ TR1添加了智能指针、一般化函数指针（tr1::function）、hash-based容器、正则表达式以及另外10个组件的支持。
+ TR1只是一个规范。为了获得TR1提供的好处，你需要一份实物。一个好的实物来源是Boost。

## 条款55：让自己熟悉Boost

+ Boost是一个社群，也是一个网站。致力于免费、源码开放、同僚审核的C++程序库开发。Boost在C++标准化过程中扮演非常重要的角色。
+ Boost提供许多TR1组件实现品，以机其他许多程序库。

























