package cn.bukaa.util.redis;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import cn.bukaa.util.StringUtil;

public class RedisUtil {
	public static String REDIS_EXE_NAME = "redis-server.exe";
	
	public static String REDIS_CONF_NAME = "redis.conf";
	
	public static String REDIS_BAT_NAME = "start.bat";
	
  
	public static String getClassPath()
	{
		return RedisUtil.class.getClassLoader().getResource("").getPath();
	}
  
	public static String getWindowsRedisPath(String file_name)
	{
		String arch = System.getProperty("os.arch");
		String path = getClassPath();
	    if ("\\".equals(File.separator)) {
	      path = path.substring(1).replaceAll("/", "\\\\");
	    }
	    if (path.lastIndexOf("\\") < path.length() - 1) {
	      path = path + "\\";
	    }
	    path = path + "redis\\windows";
	    if (arch.toLowerCase().contains("64")) {
	      path = path + "\\x64";
	    } else {
	      path = path + "\\x86";
	    }
	    path = path + "\\" + file_name;
	    return path;
	 }
  
	public static String getLinuxRedisPath()
	{
		return "/usr/local/bin/redis";
	}
  
	public static String[] getRedisCommand()
	{
		String[] command = new String[3];
		String os = System.getProperty("os.name");
		if (os.toLowerCase().contains("win"))
		{
			command[0] = StringUtil.urlDecode(getWindowsRedisPath(REDIS_EXE_NAME), "UTF-8");
			command[1] = " ";
			command[2] = StringUtil.urlDecode(getWindowsRedisPath(REDIS_CONF_NAME), "UTF-8");;
		}
		return command;
	}
	
	public static String getRedisBat() {
		String os = System.getProperty("os.name");
		if (os.toLowerCase().contains("win"))
		{
			String bat = StringUtil.urlDecode(getWindowsRedisPath(REDIS_BAT_NAME), "UTF-8");
			File batFile = new File(bat);
			if(!batFile.exists()){
				try {
					batFile.createNewFile();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
			try {
				FileWriter fw = new FileWriter(batFile);
				fw.write(StringUtil.urlDecode(getWindowsRedisPath(REDIS_EXE_NAME), "UTF-8")+" "+StringUtil.urlDecode(getWindowsRedisPath(REDIS_CONF_NAME), "UTF-8"));
				try {
					fw.close();
				} catch (Exception e) {
					e.printStackTrace();
				}
				return StringUtil.urlDecode(getWindowsRedisPath(REDIS_BAT_NAME), "UTF-8");
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return null;
	}
  
}

