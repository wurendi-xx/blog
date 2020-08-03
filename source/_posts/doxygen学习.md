---
title:利用 Doxygen生成工程文档
date: 2020-8-3 16:56:46
tags: 编码规范 工程文档
author:WuRendi
---

# Doxygen代码注释规范

[TOC]

## Doxygen使用场景

Doxygen是一个用来生成代码文档的辅助工具，依据Doxygen语法规范编写代码注释不仅可以规范代码编写格式，并且生成的代码文档能够提高代码的阅读效率，减少软件工程师的沟通成本，在工作交接中也能快速进行。

## Doxygen注释语法

### 1.注释风格

#### JavaDoc风格

```
/**
 * @brief this is a javadoc style comment1.
 */
```

#### Qt风格

```
/*!
 * @brief this is a Qt style comment.
 */
```

#### third style

```
///
/// @brief this is a third style comment1.
///
 
//!
//! @brief this is a third style comment2.
//!
```

### 2.注释层级从高级到细节

先从文件开始注释，然后是所在文件的全局函数、结构体、枚举变量、命名空间→命名空间中的类→成员函数和成员变量。

#### 文件头注释

```
/** @file [file‐name]
* @brief brief description
* @author <list of authors>
* [@author <authors description>]
* @date <date>
* @version <version number>
* @note
* detailed description
*/
```

<u>**[]表示可选，{}表示重复0到N次，<>表示必须参数**</u>

#### 类注释

```
/**
* @class <class‐name> [header‐file] [<header‐name]
* @brief brief description
* @author <list of authors>
* @note
* detailed description
*/
```

header‐file是类声明所在的头文件名字，header‐name是要显示的链接文字，一般为头文件的真实路径在include<XX>中显示。

#### 函数注释

```
/**
* @brief brief description
* @author <list of authors>
* {@param[in|out] <parameter‐name> <parameter description>}
* @exception <exception‐object> <exception description>
* {@exception <exception‐object> <exception description>}
* @return <description of the return value>
* {@return <description of the return value>}
* @note
* detailed description
* @remarks <remark text>
* {@remarks <remark text>}
* [@deprecated <description>]
* [@since when(time or version)]
* [@see references{,references}]
*/
```

@param[in|out]   参数名及其解释
@exception      用来说明异常类及抛出条件
@return          对函数返回值做解释
@note           表示注解，暴露给源码阅读者的文档
@remark         表示评论，暴露给客户程序员的文档
@since          表示从那个版本起开始有了这个函数
@deprecated    引起不推荐使用的警告
@see           表示交叉参考
函数的详细注释用@note代替详细注释，因为详细注释要空行隔开，容易忘记。


#### 成员注释

```
int ro;/**<旋转角度*/
double length;///<距离
double area;///<面积
```

#### 枚举类型注释

```
/** @brief Another enum, with inline docs */
enum AnotherEnum
{
    V1,/**< value 1 */
    V2 ///< value 2 
};
```

### 3.一般约定

一般约定中描述了通常的注释格式，**其中在功能模块之后的内容是根据单片机程序的特征进行适配的**。

#### 文件头注释

```
/** @file
* @brief brief description
* @author <list of authors>
* @date <date>
* @version <version number>
* @note
* detailed description
*/
```

#### 类注释

```
/**
* @class
* @brief brief description
* @author <list of authors>
* @note
* detailed description
*/
```

#### 全局变量和全局宏

代码上方使用：

```
/** @brief some brief description */
```

代码右方使用：

``` 
///< some brief description
```

#### 函数注释

在头文件进行简要注释：

```
/** @brief brief description */
int m_test(int a);
```

在实现处给出详细注释：

```
/**
* @brief brief description
* @author <list of authors>
* @param[in|out] <parameter‐name> <parameter description>
* @exception <exception‐object> <exception description>
* @return <description of the return value>
* @note
* detailed description
* @remarks <remark text>
*/
```

#### 枚举定义

每个枚举定义必须添加注释：

```
/** Another enum, with inline docs */
enum AnotherEnum
{
    V1, ///< value 1
    V2 ///< value 2
};
```

#### 功能模块

在单片机中会根据硬件类型编写不同的功能模块。为了让Doxygen能正确提前模块定义，需要添加模块定义注释。

```
/**
 * @addtogroup ADC
 * @brief ADC driver modules
 * @{
 */

// 程序代码

/**
 * @}
 */
```

#### 宏定义子模块

```
/**
 * @defgroup ADC_Exported_Constants
 * @{
 */

/**
 * @defgroup ADC_JitterOff
 * @{
 */
#define ADC_JitterOff_PCLKDiv2    ADC_CFGR2_JITOFFDIV2
#define ADC_JitterOff_PCLKDiv4  ADC_CFGR2_JITOFFDIV4

#define IS_ADC_JITTEROFF(JITTEROFF) (((JITTEROFF) & 0x3FFFFFFF) == (uint32_t)RESET)

/**
 * @}
 */

/**
 * @defgroup ADC_Resolution
 * @{
 */
#define ADC_Resolution_12b    ((uint32_t)0x00000000)
#define ADC_Resolution_10b    ADC_CFGR1_RES_0
#define ADC_Resolution_8b    ADC_CFGR1_RES_1
#define ADC_Resolution_6b    ADC_CFGR1_RES

#define IS_ADC_RESOLUTION(RESOLUTION)    (((RESOLUTION) == ADC_Resolution_12b) || \
                                         ((RESOLUTION) == ADC_Resolution_10b) || \
                                         ((RESOLUTION) == ADC_Resolution_8b) || \
                                         ((RESOLUTION) == ADC_Resolution_6b))

/**
 * @}
 */

/**
 * @}
 */
```

以上代码段中定义了一个名为`ADC_Exported_Constants`的模块，此模块中包含了ADC模块中所有的宏定义。

在`ADC_Exported_Constants`模块中，又有若干个子模块，如`ADC_JitterOff`、`ADC_Resolution`等。

这样组织代码可以让大量的宏定义结构更为清晰，而且有利于在其他地方进行交叉引用。

#### 函数子模块

```
/**
 * @defgroup ADC_Private_Functions
 * @{
 */

/**
 * @defgroup ADC_Group1 Initialization and Configuration functions
 * @brief Initialization and Configuration functions
 *
 * @{
 */

void ADC_DeInit(ADC_TypeDef* ADCx){}
void ADC_Init(ADC_TypeDef* ADCx,ADC_InitTypeDef* ADC_InitStruct){}
void ADC_StructInit(ADC_InitTypeDef* ADC_InitStruct){}
/**
 * @}
 */

/**
 * @defgroup ADC_Group2 Power saving functions
 * @brief      Power saving function
 * @{
 */
void ADC_AutoPowerOffCmd(ADC_TypeDef* ADCx,FunctionalState NewState){}
void ADC_WaitModeCmd(ADC_TypeDef* ADCx,FunctionalState NewState){}
/**
 * @}
 */

/**
 * @}
 */
```

以上代码在实际代码的基础上进行了精简，仅保留了进行模块定义的基本结构。代码段中定义了一个名为`ADC_Private_Functions`的模块，此模块中包含了所有的函数定义，并且各函数按用途进行了分组，分为若干个子模块，如`Initialzation and Configuration Functions`、`Power saving functions`等。

#### 结构体注释

```
/** 
  * @brief  ADC Init structure definition
  */
typedef struct
{
  /*!< Selects the resolution of the conversion.
       This parameter can be a value of @ref ADC_Resolution */
  uint32_t ADC_Resolution;                  

  /*!< Specifies whether the conversion is performed in
       Continuous or Single mode.
       This parameter can be set to ENABLE or DISABLE. */
  FunctionalState ADC_ContinuousConvMode;   

  /*!< Selects the external trigger Edge and enables the
       trigger of a regular group. This parameter can be a value
       of @ref ADC_external_trigger_edge_conversion */
  uint32_t ADC_ExternalTrigConvEdge;        

  /*!< Defines the external trigger used to start the analog
       to digital conversion of regular channels. This parameter
       can be a value of @ref ADC_external_trigger_sources_for_channels_conversion */
  uint32_t ADC_ExternalTrigConv; 

  /*!< Specifies whether the ADC data alignment is left or right.
       This parameter can be a value of @ref ADC_data_align */
  uint32_t ADC_DataAlign;                   

  /*!< Specifies in which direction the channels will be scanned
       in the sequence. 
       This parameter can be a value of @ref ADC_Scan_Direction */
  uint32_t  ADC_ScanDirection;              
}ADC_InitTypeDef;
```

此代码段中对`ADC_InitTypeDef`这个结构体进行了较为详尽的注释，开头使用`@brief`说明此结构体的主要功能，之后对结构体中每个成员的意义进行了注释。使用`/*!< Comment */`这样的语法表示此注释对应的是注释前面的语句，这样可以使代码的排版更为美观。

另外，注意到其中`@ref`标签的使用，这代表交叉应用，如`@ref ADC_Resolution`，实际会生成一个超链接指向之前定义的`ADC_Resolution`模块。这里的交叉引用可以是模块名、函数名、结构体等。

#### Todo和Bug列表

使用`@todo`和`@bug`标签列出待办事项和BUG，Doxygen会在生成文档时候自动汇总为Todo与Bug列表。

## Doxygen编辑插件

在实际编程中，可以使用辅助插件生成注释模板。

### Keil中使用

Keil中可以使用Template功能使得在写函数时生成预设的注释文本，不过依然不方便，不建议这么使用。

实现方法为：

1. 打开Edit菜单中的Configuration项

2. 切换到Text Compilation栏，修改void模板：

   ```
   /**
   * @brief a short description of what the function does
   * @param the first input value
   * @return the return value
   
   * @details a full description of what the function does
   * @see a reference to another function
   */
   void |(){
   }
   ```

   其中`|`代表模板生成后光标所在的位置

### VScode插件

VScode的插件支持非常强大，对Doxygen的支持很强，建议使用。

#### 1.插件安装和使用

插件搜索"Doxygen Documentation Generator"进行安装，输入`/**`+回车生成注释。可以直接看插件里面自带的教学，有动图易于学习。

#### 2.注释模板修改

打开VScode的`setting.json`，将插件文档中的Config options内容复制进去，并根据自己的需要进行修改。

### Qt插件

Qt编辑器默认支持Doxygen，在输入`/**`+回车生成注释。

## Doxygen使用流程

在拥有Doxygen规范注释的工程代码之后，就可以生成工程文档。

涉及到的软件有Doxygen、Graphviz、HTMLhelp（网上都可以找到）。其中Doxygen负责生成文档，Graphviz和HTMLhelp负责渲染。

Doxygen的设置步骤可以参考 [Doxygen + graphviz + Windows Help Workshop生成函数调用图和chm文件](https://blog.csdn.net/imgcl/article/details/79480350)。

或者使用我已经设置好的配置文件`Doxyfile`（C语言）。打开Doxygen之后在上方的Step1中选择此文件之后，在Project中配置好工程目录和文档输出目录，最后在切换到Run标签栏生成文档。



