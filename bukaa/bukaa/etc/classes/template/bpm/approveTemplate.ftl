<form id="approveForm" name="approveForm" action="${contextPath}/bpm/taskinst/handle" method="post" >
<#if taskEntity?? && isShowApprove && isApprove>
<script type="text/javascript">
  ${bpmButtonEvent}
</script>
<input type="hidden" id="actInstId" name="actInstId" value="${bpmProcinst.actInstId }" />
<input type="hidden" id="taskId" name="taskId" value="${taskEntity.id }">
<input type="hidden" id="backType" name="backType" value="${bpmNodeUsertask.backType }">
<input type="hidden" id="transType" name="transType" value="${bpmNodeUsertask.transType }">
<input type="hidden" id="isApprove" name="isApprove" value="1" />
<input type="hidden" id="isEdit" name="isEdit" value="${isEdit}" />

<div id="spDiv" style="width: 100%;">
  <div class="panel-toolbar-approve" style="border-top:0px;border-bottom:0px;">
    <div class="toolBar">          
      <div class="group">
        <a id="btnFlowDesign" class="link flowDesign" onclick="btnFlowDesign()"><span></span>流程图</a>
      </div>
      <div class="l-bar-separator"></div>
      <div class="group">
        <a id="btnFlowHistory" class="link history" onclick="btnFlowHistory()"><span></span>审批历史</a>
      </div>
      <div class="l-bar-separator"></div>            
    </div>  
  </div>        
  <div class="panel-body" style="width: 100%;margin:0px 0px 0 0px">
    <table class="table-detail-approve" style="margin:0px">  
      <tr>
        <th style="width: 80px">审批环节</th>
        <td>
          ${taskEntity.name}
        </td>
      </tr>                
      <tr>
        <th style="width: 80px">审批意见</th>
        <td style="padding-bottom: 3px;padding-top: 3px;">
          <textarea rows="5"  id="approvalContent" name="approvalContent" maxlength="512" style="width:260px;height:60px;"></textarea><br/>
          &nbsp;<a href="javascript:;" style="" onclick="btnSelectOpinionWin('approvalContent');"><u style="color: #555;">引用常用语</u></a>
        </td>
      </tr>  
      <tr>
        <th style="width: 80px">审批时间</th>
        <td>
           <input id="approvalDate" name="approvalDate" type="text" class="form-textbox Wdate" style="width:260px; " value="${approvalDate }">                  
        </td>
      </tr>
      
      <tr id="transTr" style="display:none;">
        <th>传送给</th>
        <td>
          <div id="transDiv" style="display:none;" >
          </div>
        </td>
      </tr>
      
                              
      <tr>
        <td style="text-align: center;height: 38px" colspan="2">                
          <#if bpmButtonList??>
            <#list bpmButtonList as button>
            	 <input type="button" style="width:60px;height:25px;" id="${button.mark}" class="${button.style}"  onclick="approveButtenEventHandler(this)" mark="${button.mark}" value="${button.name}" /> 
            </#list>
          </#if>        
        </td>
      </tr>        
    </table>
  </div>        
</div>  
 
<#else>
  <input type="hidden" id="actInstId" name="actInstId" value="${bpmProcinst.actInstId }" />
  <div class="panel-top">                   
    <div id="topNavWrapper">
      <ul id="topNav">                      
        <div class="panel-toolbar-approve">
          <div class="toolBar">          
             <div class="group">
              <a class="link flowDesign" onclick="btnFlowDesign();" ><span></span>流程图</a>
            </div>
            <div class="l-bar-separator"></div>
            <div class="group">
              <a class="link history" onclick="btnFlowHistory()" ><span></span>审批历史</a>
            </div>
            <div class="l-bar-separator"></div>                     
          </div>  
        </div>  
      </ul>                      
    </div>
  </div>     
</#if>  
</form>		
