<#setting number_format="0">
<#macro input field>

  <#--�����ı���-->  	
  <#if field.controlType == '01'>
  <input type="text" name="${field.varKey}" cname="${field.name}" style="<#if (field.controlStyle)??>${field.controlStyle}<#else>width:95%; height:22px;</#if>" class="commom-txt <#if !field.isNullable>required</#if>" value="<#if (defaultValue)??>${defaultValue}</#if>"  <#if !field.isEdit>readonly="readonly"</#if>/>

  <#--�����ı���-->
  <#elseif field.controlType == '02'>
  <textarea name="${field.varKey}" cname="${field.name}" class="form-textbox <#if !field.isNullable>required</#if>" style="<#if (field.controlStyle)??>${field.controlStyle}<#else>width:95%;height:60px;</#if>"  <#if !field.isEdit>readonly="readonly"</#if> ><#if (defaultValue)??>${defaultValue}</#if></textarea>

  <#--���������-->
  <#elseif field.controlType == '03'>
  <input type="password" name="${field.varKey}" cname="${field.name}" style="<#if (field.controlStyle)??>${field.controlStyle}<#else>width:95%;</#if>"  class="form-textbox <#if !field.isNullable>required</#if>" value="<#if (defaultValue)??>${defaultValue}</#if>"  <#if !field.isEdit>readonly="readonly"</#if>/>

  <#--������-->
  <#elseif field.controlType == '04'>
  <select name="${field.varKey}" cname="${field.name}" class="form-textbox <#if !field.isNullable>required</#if>" style="<#if (field.controlStyle)??>${field.controlStyle}<#else>width:200px;height:25px;</#if>"  <#if !field.isEdit>readonly="readonly"</#if>>
    <option value=""></option>
    <#if (optionsList)??>
	    <#list optionsList as option>
	    	<option value="${option.value}" <#if option.value == defaultValue! >selected="selected"</#if> >${option.text}</option>
	    </#list>
	</#if>
    </select>

  <#--�б��-->
  <#elseif field.controlType == '05'>
    <select name="${field.varKey}" cname="${field.name}" multiple="multiple" class="form-textbox <#if !field.isNullable>required</#if>" style="<#if (field.controlStyle)??>${field.controlStyle}<#else>width:95%;height:80px;</#if>"  <#if !field.isEdit>readonly="readonly"</#if>> 
      <#if (optionsList)??>
	    <#list optionsList as option>
	    	<option value="${option.value}" <#if option.value == defaultValue! >selected="selected"</#if> >${option.text}</option>
	    </#list>
	  </#if>
    </select>

  <#--����ʱ��ؼ�-->
  <#elseif field.controlType == '06'>
  	 <input name="${field.varKey}" cname="${field.name}" type="text" class="Wdate <#if !field.isNullable>required</#if>" style="<#if (field.controlStyle)??>${field.controlStyle}<#else>width:95%;</#if>" displayDate="true"  dateFmt="<#if (field.dateFormat)??>${field.dateFormat}<#else>yyyy-MM-dd</#if>" value="<#if (defaultValue)??>${defaultValue}</#if>"   <#if !field.isEdit>readonly="true"</#if> />
  	 
  <#--��ѡ��-->
  <#elseif field.controlType == '07'>
 	<#if (optionsList)??>
    	<#list optionsList as option>
    		<input type="checkbox" name="${field.varKey}" class="<#if !field.isNullable>required</#if>" cname="${field.name}" <#if option.value == defaultValue! >checked="true"</#if>  value="${option.value}" <#if !field.isEdit>readonly="readonly"</#if>/>${option.text}
    	</#list>
  	</#if>	  

  <#--��ѡ��ť-->
  <#elseif field.controlType == '08'>
  	<#if (optionsList)??>
    	<#list optionsList as option>
    		<input type="radio" name="${field.varKey}" class="<#if !field.isNullable>required</#if>" cname="${field.name}" <#if option.value == defaultValue! >checked="true"</#if>  value="${option.value}"  <#if !field.isEdit>readonly="readonly"</#if>/>${option.text}
    	</#list>
  	</#if>

  <#--������-->
  <#elseif field.controlType == '09'>
    <input name="${field.varKey}" cname="${field.name}" type="hidden" class="inputText <#if !field.isNullable>required</#if>" value="<#noparse>${</#noparse>${field.varKey}}"  <#if !field.isEdit>readonly="readonly"</#if> />

  <#--�����ֵ�-->
  <#elseif field.controlType == '10'>
    <input type="text" name="${field.varKey}Name" cname="${field.name}" class="dic <#if !field.isNullable>required</#if>" dicName="${field.dicName}" initVal="<#if (defaultValue)??>${defaultValue}</#if>"  style="<#if (field.controlStyle)??>${field.controlStyle}<#else>width:95%;</#if>" isFixOptions="false" searchField="name,code,scode,jpcode"  <#if !field.isEdit>readonly="readonly"</#if>/>
  
  </#if>
</#macro>

<tr>
	<th>
		<span class="shOrSp"></span>${field.name}
	</th>
	<td>
		<@input field/>
	</td>
</tr> 
                                                                                                  