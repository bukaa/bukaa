package cn.bukaa.controller.sys;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;

import sundun.cache.cons.CacheConstants;
import cn.bukaa.util.StringUtil;

/**
 * 
* <p>Title: </p>
* <p>Description: </p>
* @author BUKAA
* @date 2016-11-6 下午1:37:44
 */
public class SystemStart extends HttpServlet{
	
	private static final long serialVersionUID = -7418788312972484553L;

	public SystemStart() {
		super();
	}

	public void destroy() {
		super.destroy(); 
	}

	/**
	 * 初始化化系统
	 * @throws ServletException if an error occure
	 */
	public void init(){
		long beginTime = System.currentTimeMillis();
		System.out.println("--------------------------------------------");		
		System.out.println("----------------系统开始初始化--------------");			
		System.out.println("----------------服务器配置如下：------");
		System.out.println("应用服务器：" + getServerInfo()); 		
		System.out.println("JDK版本：" + System.getProperty("java.version")); 
		System.out.println("----------------初始化业务BEAN管理服务--------");
		//serviceInit();
		System.out.println("----------------初始化缓存服务--------");
		initCache();
		long endTime = System.currentTimeMillis();		
		System.out.println("----------------耗时：" + (endTime - beginTime) + "毫秒!---------------");
		System.out.println("----------------系统初始化完毕--------------");
		System.out.println("--------------------------------------------");
	}
	
	/**
	 * 获取应用服务器信息
	 * @return String
	 */
	private String getServerInfo(){
		ServletContext sc = getServletContext();
		String containerInfo = sc.getServerInfo();
		String serverInfo = "";
		
		if(StringUtil.isNotEmpty(containerInfo)){
			String serverName = "";
			String containerVersion = "";
			
			if(containerInfo.toLowerCase().indexOf("tomcat") >= 0){
				serverName = "Tomcat";				
			}
			else if(containerInfo.toLowerCase().indexOf("websphere") >= 0){
				serverName = "Websphere";				
			}
			else if(containerInfo.toLowerCase().indexOf("jboss") >= 0){
				serverName = "Jboss";				
			}
						
			if (containerInfo.indexOf("/") > 0) {
				containerVersion = containerInfo.substring(containerInfo.lastIndexOf("/") + 1);
			}
			else{
				containerVersion = "0";
			}
			
			serverInfo = serverName + "(" + containerVersion + ")";
		}
		
		return serverInfo;
	}
	
	
	
	/**
	 * 初始化缓存
	 */
	public void initCache()
	{
		boolean isDisableCache = Boolean.parseBoolean(this.getInitParameter("isDisableCache"));
		if(isDisableCache)
		{
			System.setProperty(CacheConstants.DISABLE_CACHE_PROPERTY,"true");
		}else
		{
			System.setProperty(CacheConstants.DISABLE_CACHE_PROPERTY,"false");
		}
	}
}
