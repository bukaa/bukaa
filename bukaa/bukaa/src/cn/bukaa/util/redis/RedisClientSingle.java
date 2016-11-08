package cn.bukaa.util.redis;

import java.io.IOException;
import java.util.Arrays;
import java.util.Properties;

import org.apache.commons.net.telnet.TelnetClient;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import redis.clients.jedis.Jedis;
import cn.bukaa.util.*;


public class RedisClientSingle {
  private Jedis client;
  private static RedisClientSingle instance;
  private static Object lock = new Object();
  
  private RedisClientSingle()
  {
    if (!Boolean.parseBoolean(System.getProperty("ssm.cache.disable")))
    {
    	System.out.println("初始化Redis...");
      
    	Resource rs = new ClassPathResource("redis.properties");
      
    	Properties prop = null;
    	try
    	{
    		prop = PropertiesLoaderUtil.loadProperties(rs.getFile());
    	}
    	catch (IOException e1)
    	{
    		e1.printStackTrace();
    	}
    	try
    	{
    		checkRedisServers(prop);
    		this.client = RedisPoolUtil.getJedis();
    		if(this.client != null){
    			System.out.println("【缓存管理】Redis连接成功。。。");
    		}else{
    			System.err.println("【缓存管理】Redis连接失败。。。");
    		}
    	}
    	catch (Exception e)
    	{
    		e.printStackTrace();
    	}
    }
  }
  
  public static RedisClientSingle getInstance()
  {
    if (instance == null) {
      synchronized (lock)
      {
        if (instance == null) {
          instance = new RedisClientSingle();
        }
      }
    }
    return instance;
  }
  
  public Jedis getClient()
  {
    return this.client;
  }
  
  private void checkRedisServers(Properties prop){
	  boolean isSuccess = false;
	  String addr = prop.getProperty("redis.host");
	  String port = prop.getProperty("redis.port");
	  String os = System.getProperty("os.name");
	  TelnetClient telnet = new TelnetClient();
	  telnet.setConnectTimeout(1000);
	  if (os.toLowerCase().contains("win")) {
		  try {
			  telnet.connect(addr, Integer.parseInt(port));
	    	  isSuccess = true;
		  }catch (Exception e) {
	    	  System.err.println("【缓存管理】redis连接测试失败" + e.getMessage());
	      }
	      try
	      {
	    	  telnet.disconnect();
	      }
	      catch (Exception e)
	      {
	    	  System.err.println("【缓存管理】redis断开时发生异常" + e.getMessage());
	      }
	      if (!isSuccess) {
	    	  System.out.println("【缓存管理】配置的Redis服务器地址连接失败");
	    	  if (os.toLowerCase().contains("win"))
	    	  {
	    		  System.out.println("【缓存管理】检测本地进程");
	    		  boolean exsit = RuntimeProcessUtil.exsitProcess("redis.exe");
	    		  if (!exsit) {
	    			  System.out.println("【缓存管理】本地Redis进程未启动，即将启动本地进程");
	    			  String[] cmd = RedisUtil.getRedisCommand();
	    			  String bat =  RedisUtil.getRedisBat();
	    			  try {
	    				  Runtime rt = Runtime.getRuntime();
	    				  System.out.println("Running " + bat);  
	    				  Process proc = rt.exec(bat);
	    				  StreamGobbler errorGobbler = new StreamGobbler(proc.getErrorStream(), "ERROR");  
	    				  StreamGobbler outputGobbler = new StreamGobbler(proc.getInputStream(), "OUTPUT");  
	    				  errorGobbler.start();  
	    				  outputGobbler.start();  
					} catch (Throwable e) {
							System.out.println("【缓存管理】本地Redis进程启动失败，启动命令：" + Arrays.toString(cmd));
							e.printStackTrace();
					}
	    		  }
	    	  }
	      }
  	}
  }
}

