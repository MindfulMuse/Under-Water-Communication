module testbench;
    reg [7:0] temp, hum;
    reg [15:0] pres;
    wire alert;
    
    monitor_conditions uut(temp, hum, pres, alert);
    
    integer file;
    
    initial begin
        $dumpfile("output.vcd");
        $dumpvars(0, testbench);

        file = $fopen("sensor_data.txt", "r");
        if (file == 0) begin
            $display("Failed to open file!");
            $finish;
        end
        
        while (!$feof(file)) begin
            $fscanf(file, "%d,%d,%d\n", temp, hum, pres);
            #10;
            $display("Temp: %d, Hum: %d, Pres: %d => Alert: %b", temp, hum, pres, alert);
            $fwrite("output.txt", "%b\n", alert);
        end
        
        $fclose(file);
        $finish;
    end
endmodule

