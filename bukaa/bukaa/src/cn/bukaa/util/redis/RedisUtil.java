package cn.bukaa.util.redis;

import groovy.util.logging.Slf4j;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.List;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.ShardedJedis;
import cn.bukaa.util.StringUtil;

@Slf4j
public class RedisUtil {
	public static String REDIS_EXE_NAME = "redis-server.exe";
	
	public static String REDIS_CONF_NAME = "redis.conf";
	
	public static String REDIS_BAT_NAME = "start.bat";
	
	public static ShardedJedis shardedJedis;
	
	public static Jedis jedis;
	
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
  
	/**
	 * 获取redis启动批处理文件在windows中的路径
	 * @return
	 */
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
	
	/*public static String set(String key, String value){
		return getShardedJedis().set(key, value);
	}
	
	public static String get(String key){
		return getShardedJedis().get(key);
	}*/
	
	/**
	 * 插入List
	 * @param key
	 * @param list
	 * @return
	 */
	public static Long set(String key, List<String> list){
		if(list == null || shardedJedis == null){
			return 0L;
		}
		return	shardedJedis.lpush(key, (String[])list.toArray());
	}
	
	/**
	 * 插入数组
	 * @param key
	 * @param str
	 * @return
	 */
	public static Long set(String key, String[] str){
		if(str == null || shardedJedis == null){
			return 0L;
		}
		return	shardedJedis.lpush(key, str);
	}
	
	/**
	 * 删除key
	 * @param key
	 */
	public static Long remove(String key){
		return shardedJedis.del(key);
	}
  
}

