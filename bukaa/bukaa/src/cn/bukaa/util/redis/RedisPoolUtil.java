package cn.bukaa.util.redis;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import org.springframework.core.io.ClassPathResource;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.JedisShardInfo;
import redis.clients.jedis.ShardedJedis;
import redis.clients.jedis.ShardedJedisPool;
import cn.bukaa.util.PropertiesLoaderUtil;

/**
 * redis池管理
 * @author BUKAA
 *
 */
public final class RedisPoolUtil {
    
    //Redis服务器IP
    private static String ADDR = "127.0.0.1";
    
    //Redis的端口号
    private static int PORT = 6379;
    
    //访问密码
    private static String AUTH = "bukaa";
    
    //控制一个pool最多有多少个状态为idle(空闲的)的jedis实例，默认值也是8。
    private static int MAX_IDLE = 200;
    
    //等待可用连接的最大时间，单位毫秒，默认值为-1，表示永不超时。如果超过等待时间，则直接抛出JedisConnectionException；
    private static int MAX_WAIT = 10000;
    
    private static int TIMEOUT = 10000;
    
    //在borrow一个jedis实例时，是否提前进行validate操作；如果为true，则得到的jedis实例均是可用的；
    private static boolean TEST_ON_BORROW = true;
    
    private static JedisPool jedisPool;//非切片连接池
    
    private static ShardedJedisPool shardedJedisPool;//切片连接池
    
    /**
     * 初始化Redis连接池
     */
    static {
        try {
        	Properties prop = null;
        	try {
        		prop = PropertiesLoaderUtil.loadProperties(new ClassPathResource("redis.properties").getFile());
			} catch (Exception e) {
				System.out.println(e.getMessage());
			}
        	if(prop != null){
        		//Redis服务器IP
        		ADDR = prop.getProperty("redis.host");
        		
        		//Redis的端口号
        		PORT = Integer.parseInt(prop.getProperty("redis.port"));
        		
        		//访问密码
        		AUTH = prop.getProperty("redis.auth");
        		
        		//控制一个pool最多有多少个状态为idle(空闲的)的jedis实例，默认值也是8。
        		MAX_IDLE = Integer.parseInt(prop.getProperty("redis.maxIdle"));
        		
        		//等待可用连接的最大时间，单位毫秒，默认值为-1，表示永不超时。如果超过等待时间，则直接抛出JedisConnectionException；
        		MAX_WAIT = Integer.parseInt(prop.getProperty("redis.maxWait"));
        		
        		TIMEOUT = Integer.parseInt(prop.getProperty("redis.timeout"));
        		
        		//在borrow一个jedis实例时，是否提前进行validate操作；如果为true，则得到的jedis实例均是可用的；
        		TEST_ON_BORROW =Boolean.parseBoolean(prop.getProperty("redis.testOnBorrow"));
        	}
            
            JedisPoolConfig config = new JedisPoolConfig();
            config.setMaxIdle(MAX_IDLE);
            config.setMaxWaitMillis(MAX_WAIT);
            config.setTestOnBorrow(TEST_ON_BORROW);
            jedisPool = new JedisPool(config, ADDR, PORT, TIMEOUT, AUTH);
            
            // slave链接 
            List<JedisShardInfo> shards = new ArrayList<JedisShardInfo>(); 
            shards.add(new JedisShardInfo(ADDR, PORT, TIMEOUT, AUTH)); 
            // 构造池 
            shardedJedisPool = new ShardedJedisPool(config, shards); 
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    /**
     * 获取Jedis(非切片)实例
     * @return
     */
    public synchronized static Jedis getJedis() {
        try {
            if (jedisPool != null) {
                return jedisPool.getResource();
            } else {
                return null;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
    
    /**
     * 获取Jedis(切片)实例
     * @return
     */
    public synchronized static ShardedJedis getShardedJedis() {
    	try {
    		if (shardedJedisPool != null) {
    			return shardedJedisPool.getResource();
    		} else {
    			return null;
    		}
    	} catch (Exception e) {
    		e.printStackTrace();
    		return null;
    	}
    }
    
    /**
     * 释放jedis资源
     * @param jedis
     */
    public static void returnResource(final Jedis jedis) {
        if (jedis != null) {
            jedisPool.returnResource(jedis);
        }
    }
}
