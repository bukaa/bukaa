package cn.bukaa.util.redis;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;


/**
 * @author BUKAA
 *
 */
public class StreamGobbler extends Thread {
	private InputStream is;
	private String type;
	
	public StreamGobbler(InputStream is, String type)
	{
		this.is = is;
		this.type = type;
	}
	
	public void run()
	{
		try{
			InputStreamReader isr = new InputStreamReader(is);  
            BufferedReader br = new BufferedReader(isr);  
            String line = null;  
            while ((line = br.readLine()) != null){
            	System.out.println(type + ">" + line);
            }
		} catch (IOException e){
			e.printStackTrace();
		}
	}
}

